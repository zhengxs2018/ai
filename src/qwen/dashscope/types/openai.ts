import type OpenAI from 'openai';

import type { DashscopeChat } from './chat';
import type { DashscopeCompletions } from './completions';

export namespace OpenAICompletionsCompatibility {
  export type CompletionModel = DashscopeCompletions.CompletionModel;

  export interface StreamOptions {
    /**
     * 启用增量输出
     *
     * 在启用流输出参数后，是否每次输出是否每次都包含前面输出的内容。
     *
     * @defaultValue true
     */
    incremental_output?: boolean | null;
  }

  export interface CompletionCreateParamsBase
    extends Pick<
      DashscopeCompletions.CompletionParametersParam,
      | 'enable_search'
      | 'temperature'
      | 'presence_penalty'
      | 'repetition_penalty'
      | 'top_k'
      | 'top_p'
      | 'seed'
      | 'stop'
      | 'max_tokens'
      | 'stream'
    > {
    /**
     * 生成模型
     *
     * 内置的 {@link CompletionModel} 是经过测试的，但你可以通过 [模型列表](https://help.aliyun.com/zh/dashscope/developer-reference/model-square) 测试其他支持的模型。
     */
    model: ({} & string) | CompletionModel;

    /**
     * 用户输入的指令，用于指导模型生成回复
     */
    prompt: string;

    /**
     * 流输出额外参数
     */
    stream_options?: StreamOptions | null;

    /**
     * 响应格式
     */
    response_format?: {
      type?: 'text';
    };
  }

  export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
    /**
     * 启用流式输出
     *
     * 默认每次输出为当前生成的整个序列，最后一次输出为最终全部生成结果
     * 可以使用 {@link StreamOptions stream_options} 参数关闭。
     */
    stream?: false | null;
  }

  export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
    /**
     * 启用流式输出
     *
     * 默认每次输出为当前生成的整个序列，最后一次输出为最终全部生成结果
     * 可以使用 {@link StreamOptions stream_options} 参数关闭。
     */
    stream: true;
  }

  export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;
}

export namespace OpenAIChatCompatibility {
  export type ChatModel = DashscopeChat.ChatModel;

  export interface ChatCompletionCreateParamsBase
    extends Pick<
      DashscopeCompletions.CompletionParametersParam,
      | 'enable_search'
      | 'temperature'
      | 'presence_penalty'
      | 'repetition_penalty'
      | 'top_k'
      | 'top_p'
      | 'seed'
      | 'stop'
      | 'max_tokens'
      | 'stream'
    > {
    /**
     * 聊天模型
     *
     * 内置的 {@link ChatModel} 是经过测试的，但你可以通过 [模型列表](https://help.aliyun.com/zh/dashscope/developer-reference/model-square) 测试其他支持的模型。
     */
    model: ({} & string) | ChatModel;

    /**
     * 聊天上下文信息
     */
    messages: OpenAI.ChatCompletionMessageParam[];

    /**
     * 指定可供模型调用的工具列表
     *
     * 当输入多个工具时，模型会选择其中一个生成结果。
     */
    tools?: OpenAI.ChatCompletionTool[];

    /**
     * SDK 内部有特殊的多模型消息适配机制
     *
     * 设置为 true 可以直接采用外部传递的消息格式
     */
    raw?: boolean | null;

    /**
     * 流输出额外参数
     */
    stream_options?: OpenAICompletionsCompatibility.StreamOptions | null;

    /**
     * 响应格式
     */
    response_format?: {
      type?: 'text';
    };
  }

  export interface ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase {
    /**
     * 启用流式输出
     *
     * 默认每次输出为当前生成的整个序列，最后一次输出为最终全部生成结果
     * 可以使用 {@link ChatCompletionCreateParamsBase.stream_options stream_options} 参数关闭。
     */
    stream?: false | null;
  }

  export interface ChatCompletionCreateParamsStreaming extends ChatCompletionCreateParamsBase {
    /**
     * 启用流式输出
     *
     * 默认每次输出为当前生成的整个序列，最后一次输出为最终全部生成结果
     * 可以使用 {@link ChatCompletionCreateParamsBase.stream_options stream_options} 参数关闭。
     */
    stream: true;
  }

  export type ChatCompletionCreateParams = ChatCompletionCreateParamsNonStreaming | ChatCompletionCreateParamsStreaming;
}
