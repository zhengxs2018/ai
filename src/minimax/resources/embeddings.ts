import OpenAI, { APIError } from 'openai';
import { type RequestOptions } from 'openai/core';

import { APIResource } from '../../resource';

export class Embeddings extends APIResource {
  /**
   * Creates an embedding vector representing the input text.
   *
   * See https://cloud.baidu.com/doc/WENXINWORKSHOP/s/alj562vvu
   */
  async create(
    params: EmbeddingCreateParams,
    options?: RequestOptions,
  ): Promise<OpenAI.CreateEmbeddingResponse> {
    const { model, input, type = 'query' } = params;

    const response: Response = await this._client.post('/embeddings', {
      body: {
        model,
        texts: input,
        type,
      },
      ...options,
      __binaryResponse: true,
    });

    const data: CreateEmbeddingResponse = await response.json();

    Embeddings.assert(data);

    return {
      data: data.vectors.map((embedding, index) => {
        return {
          embedding,
          index: index,
          object: 'embedding',
        };
      }),
      model: model,
      object: 'list',
      usage: {
        prompt_tokens: data.total_tokens,
        total_tokens: data.total_tokens,
      },
    };
  }

  /**
   * 如果 code 不为 0，抛出 APIError
   *
   * @param code -
   * @param message -
   */
  static assert(data: CreateEmbeddingResponse) {
    if (data.base_resp.status_code === 0) return;

    const error = {
      code: data.base_resp.status_code,
      message: data.base_resp.status_msg,
    };

    throw new APIError(undefined, error, undefined, undefined);
  }
}

export interface EmbeddingCreateParams extends OpenAI.EmbeddingCreateParams {
  /**
   * 模型
   */
  model: 'embo-01';

  /**
   * 首先通过db生成目标内容的向量并存储到向量数据库中，之后通过query生成检索文本的向量。
   */
  type?: 'db' | 'query';
}

type CreateEmbeddingResponse = {
  vectors: number[][];
  total_tokens: number;
  base_resp: {
    status_code: number;
    status_msg: string;
  };
};
