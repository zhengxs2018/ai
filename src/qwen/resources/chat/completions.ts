import OpenAI, { APIError } from 'openai';
import { type Headers } from 'openai/core';
import { Stream } from 'openai/streaming';

import { APIResource } from '../../../resource';
import { iterMessages, SSEDecoder } from '../../../streaming';

export class Completions extends APIResource {
  /**
   * Creates a model response for the given chat conversation.
   *
   * See https://help.aliyun.com/zh/dashscope/developer-reference/api-details
   */
  create(body: ChatCompletionCreateParamsNonStreaming, options?: OpenAI.RequestOptions): Promise<OpenAI.ChatCompletion>;
  create(
    body: ChatCompletionCreateParamsStreaming,
    options?: OpenAI.RequestOptions,
  ): Promise<Stream<OpenAI.ChatCompletionChunk>>;

  async create(params: ChatCompletionCreateParams, options?: OpenAI.RequestOptions) {
    const headers: Headers = {
      ...options?.headers,
    };

    if (params.stream) {
      headers['Accept'] = 'text/event-stream';
    }

    const body = Completions.buildCreateParams(params);

    const path = isMultiModal(params.model)
      ? '/services/aigc/multimodal-generation/generation'
      : '/services/aigc/text-generation/generation';

    const response: Response = await this._client.post(path, {
      ...options,
      // @ts-expect-error 类型冲突？
      body,
      headers,
      // 通义千问的响应内容被包裹了一层，需要解构并转换为 OpenAI 的格式
      // 设置 __binaryResponse 为 true， 是为了让 client 返回原始的 response
      stream: false,
      __binaryResponse: true,
    });

    if (params.stream) {
      const controller = new AbortController();

      options?.signal?.addEventListener('abort', () => {
        controller.abort();
      });

      return Completions.fromSSEResponse(body.model, response, controller);
    }

    return Completions.fromResponse(body.model, await response.json());
  }

  static buildCreateParams(params: ChatCompletionCreateParams): ChatCompletions.ChatCompletionCreateParams {
    const { model, messages, presence_penalty, ...parameters } = params;

    const data: ChatCompletions.ChatCompletionCreateParams = {
      model,
      input: {
        messages,
      },
      parameters,
    };

    if (isMultiModal(model)) {
      // 修复与 OpenAI 的兼容性问题
      data.input.messages.forEach(message => {
        if (Array.isArray(message.content)) {
          message.content.forEach(part => {
            if (part.type === 'image_url') {
              // @ts-expect-error
              part.image = part.image_url.url;

              // @ts-expect-error
              delete part.image_url;
            }

            // @ts-expect-error
            delete part.type;
          });
        } else {
          message.content = [
            // @ts-expect-error
            { text: message.content! },
          ];
        }

        return message;
      });
    } else {
      data.parameters.result_format = 'text';
      data.parameters.repetition_penalty = presence_penalty;

      if (params.stream) {
        data.parameters.incremental_output = true;
      }
    }

    return data;
  }

  static fromResponse(model: string, data: ChatCompletions.ChatCompletion): OpenAI.ChatCompletion {
    Completions.assert(data);

    const { output, usage } = data;

    const choice: OpenAI.ChatCompletion.Choice = {
      index: 0,
      message: {
        role: 'assistant',
        content: output.text,
      },
      finish_reason: output.finish_reason || 'stop',
    };

    if (isMultiModal(model)) {
      const { message } = output.choices[0];

      const content = message.content;

      choice.message = {
        role: 'assistant',
        content: Array.isArray(content) ? content[0].text : content,
      };
    }

    return {
      id: data.request_id,
      model: model,
      choices: [choice],
      created: Date.now() / 1000,
      object: 'chat.completion',
      usage: {
        completion_tokens: usage.output_tokens,
        prompt_tokens: usage.input_tokens,
        total_tokens: usage.total_tokens,
      },
    };
  }

  static fromSSEResponse(
    model: string,
    response: Response,
    controller: AbortController,
  ): Stream<OpenAI.ChatCompletionChunk> {
    let consumed = false;
    const decoder = new SSEDecoder();

    function transform(data: ChatCompletions.ChatCompletionChunk): OpenAI.ChatCompletionChunk {
      const choice: OpenAI.ChatCompletionChunk.Choice = {
        index: 0,
        delta: {
          role: 'assistant',
          content: data.output.text || '',
        },
        finish_reason: null,
      };

      const finish_reason = data.output.finish_reason;

      if (isMultiModal(model)) {
        // @ts-expect-error
        choice.delta = data.output.choices[0].message;
      }

      if (finish_reason !== 'null') {
        choice.finish_reason = finish_reason;
      }

      return {
        id: data.request_id,
        model,
        choices: [choice],
        object: 'chat.completion.chunk',
        created: Date.now() / 1000,
      };
    }

    async function* iterator(): AsyncIterator<OpenAI.ChatCompletionChunk, any, undefined> {
      if (consumed) {
        throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
      }
      consumed = true;
      let done = false;
      try {
        for await (const sse of iterMessages(response, decoder, controller)) {
          if (done) continue;

          if (sse.data.startsWith('[DONE]')) {
            done = true;
            continue;
          }

          if (sse.event === 'result') {
            let data;

            try {
              data = JSON.parse(sse.data);
            } catch (e) {
              console.error(`Could not parse message into JSON:`, sse.data);
              console.error(`From chunk:`, sse.raw);
              throw e;
            }

            if (data && data.code) {
              throw new APIError(undefined, data, undefined, undefined);
            }

            yield transform(data);
          }
        }
        done = true;
      } catch (e) {
        // If the user calls `stream.controller.abort()`, we should exit without throwing.
        if (e instanceof Error && e.name === 'AbortError') return;
        throw e;
      } finally {
        // If the user `break`s, abort the ongoing request.
        if (!done) controller.abort();
      }
    }

    return new Stream(iterator, controller);
  }

  static assert(
    resp: ChatCompletions.APIErrorResponse | ChatCompletions.ChatCompletion | ChatCompletions.ChatCompletionChunk,
  ) {
    if ('code' in resp) {
      throw new APIError(undefined, resp, undefined, undefined);
    }
  }
}

function isMultiModal(model: ChatModel): boolean {
  return model.startsWith('qwen-vl');
}

export interface ChatCompletionCreateParamsNonStreaming
  extends Pick<
    OpenAI.ChatCompletionCreateParamsNonStreaming,
    'messages' | 'stop' | 'stream' | 'temperature' | 'presence_penalty' | 'top_p' | 'max_tokens' | 'seed'
  > {
  model: ChatModel;
  top_k?: number | null;
  enable_search?: boolean | null;
}

export interface ChatCompletionCreateParamsStreaming
  extends Pick<
    OpenAI.ChatCompletionCreateParamsStreaming,
    'messages' | 'stop' | 'stream' | 'temperature' | 'presence_penalty' | 'top_p' | 'max_tokens' | 'seed'
  > {
  model: ChatModel;
  top_k?: number | null;
  enable_search?: boolean | null;
}

export type ChatCompletionCreateParams = ChatCompletionCreateParamsNonStreaming | ChatCompletionCreateParamsStreaming;

export type ChatModel =
  | (string & NonNullable<unknown>)
  | 'qwen-turbo'
  | 'qwen-plus'
  | 'qwen-max'
  | 'qwen-max-1201'
  | 'qwen-max-longcontext'
  | 'baichuan2-7b-chat-v1'
  // 多模型
  | 'qwen-vl-v1'
  | 'qwen-vl-chat-v1'
  | 'qwen-vl-plus';

export namespace ChatCompletions {
  /**
   * - text 旧版本的 text
   * - message 兼容 openai 的 message
   *
   * @defaultValue "text"
   */
  export type ResultFormat = 'text' | 'message';

  export type ChatCompletionInputParam = {
    /**
     * 聊天上下文信息
     */
    messages: OpenAI.ChatCompletionCreateParams['messages'];
  };

  export type ChatCompletionParameters = {
    /**
     * 生成结果的格式
     *
     * @defaultValue "text"
     */
    result_format?: ResultFormat;

    /**
     * 生成时，随机数的种子，用于控制模型生成的随机性。
     *
     * 如果使用相同的种子，每次运行生成的结果都将相同；
     * 当需要复现模型的生成结果时，可以使用相同的种子。
     * seed参数支持无符号64位整数类型。
     *
     * @defaultValue 1234
     */
    seed?: number | null;

    /**
     * 用于限制模型生成token的数量，max_tokens设置的是生成上限，并不表示一定会生成这么多的token数量。最大值和默认值均为1500
     *
     * @defaultValue 1500
     */
    max_tokens?: number | null;

    /**
     * 生成文本的多样性
     *
     * @defaultValue 0.8
     */
    top_p?: number | null;

    /**
     * 生成时，采样候选集的大小。
     *
     * 例如，
     * 取值为50时，仅将单次生成中得分最高的50个token组成随机采样的候选集。
     * 取值越大，生成的随机性越高；取值越小，生成的确定性越高。
     *
     * 注意：如果top_k参数为空或者top_k的值大于100，表示不启用top_k策略，此时仅有top_p策略生效，默认是空。
     *
     * @defaultValue 80
     */
    top_k?: number | null;

    /**
     * 用于控制模型生成时的重复度。提高repetition_penalty时可以降低模型生成的重复度。1.0表示不做惩罚。默认为1.1。
     */
    repetition_penalty?: number | null;

    /**
     * 内容随机性
     *
     * @defaultValue 1.0
     */
    temperature?: number | null;

    /**
     * 生成停止标识符
     */
    stop?: string | string[] | null;

    /**
     * 生成时，是否参考搜索的结果。
     *
     * 注意：打开搜索并不意味着一定会使用搜索结果；
     * 如果打开搜索，模型会将搜索结果作为prompt，进而“自行判断”是否生成结合搜索结果的文本，默认为false
     */
    enable_search?: boolean | null;

    /**
     * 用于控制流式输出模式，默认False，即后面内容会包含已经输出的内容；
     * 设置为True，将开启增量输出模式，后面输出不会包含已经输出的内容，您需要自行拼接整体输出
     *
     * @defaultValue false
     */
    incremental_output?: boolean | null;
  };

  export interface ChatCompletionCreateParams {
    model: ChatModel;
    input: ChatCompletionInputParam;
    parameters: ChatCompletionParameters;
  }

  export interface ChatCompletionUsage {
    output_tokens: number;
    input_tokens: number;
    total_tokens: number;
  }

  export interface ChatCompletion {
    request_id: string;
    usage: ChatCompletionUsage;
    output: {
      text: string;
      finish_reason: 'stop' | 'length';
      // Note: 仅多模型支持
      choices: OpenAI.ChatCompletion['choices'];
    };
  }

  export interface ChatCompletionChunk {
    request_id: string;
    usage: ChatCompletionUsage;
    output: {
      text: string;
      finish_reason: 'stop' | 'length' | 'null';

      // Note: 仅多模型支持
      choices: OpenAI.ChatCompletion['choices'];
    };
  }

  export interface APIErrorResponse {
    code: string;
    message: string;
    request_id: string;
  }
}
