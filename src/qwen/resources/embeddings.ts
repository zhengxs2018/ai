import OpenAI from 'openai';
import { type RequestOptions } from 'openai/core';

import { APIResource } from '../../resource';
import { DashscopeEmbeddings } from '../dashscope';
import { fromEmbeddingCreatePrams, toEmbedding } from '../dashscope/resolvers/embeddings';

export class Embeddings extends APIResource {
  /**
   * Creates an embedding vector representing the input text.
   *
   * See https://help.aliyun.com/zh/dashscope/developer-reference/generic-text-vector
   */
  async create(
    params: OpenAI.EmbeddingCreateParams,
    options?: RequestOptions,
  ): Promise<OpenAI.CreateEmbeddingResponse> {
    const body = fromEmbeddingCreatePrams(params);

    const response: Response = await this._client.post('/services/embeddings/text-embedding/text-embedding', {
      ...options,
      body: body,
      __binaryResponse: true,
    });

    return toEmbedding(params, await response.json());
  }
}

export type EmbeddingModel = Embeddings.EmbeddingModel;

export type EmbeddingCreateParams = Embeddings.EmbeddingCreateParams;

export namespace Embeddings {
  export type EmbeddingModel = DashscopeEmbeddings.EmbeddingModel;
  export type EmbeddingCreateParams = DashscopeEmbeddings.EmbeddingCreateParams;
}
