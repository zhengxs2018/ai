import OpenAI from 'openai';
import { type RequestOptions } from 'openai/core';

import { APIResource } from '../../resource';

export class Embeddings extends APIResource {
  /**
   * Creates an embedding vector representing the input text.
   *
   * See https://help.aliyun.com/zh/dashscope/developer-reference/generic-text-vector
   */
  async create(params: EmbeddingCreateParams, options?: RequestOptions): Promise<OpenAI.CreateEmbeddingResponse> {
    const { model, input, type = 'query' } = params;

    const response: Response = await this._client.post('/services/embeddings/text-embedding/text-embedding', {
      body: {
        model,
        input: {
          texts: input,
        },
        parameters: {
          text_type: type,
        },
      },
      ...options,
      __binaryResponse: true,
    });

    return this.afterResponse(model, await response.json());
  }

  protected afterResponse(model: EmbeddingModel, data: CreateEmbeddingResponse): OpenAI.CreateEmbeddingResponse {
    const { output, usage } = data;

    return {
      data: output.embeddings.map(({ text_index, embedding }) => ({
        index: text_index,
        embedding,
        object: 'embedding',
      })),
      model: model,
      object: 'list',
      usage: {
        prompt_tokens: usage.total_tokens,
        total_tokens: usage.total_tokens,
      },
    };
  }
}

export type EmbeddingModel = Embeddings.EmbeddingModel;

export type EmbeddingCreateParams = Embeddings.EmbeddingCreateParams;

export namespace Embeddings {
  export type EmbeddingModel =
    | 'text-embedding-v1'
    | 'text-embedding-async-v1'
    | 'text-embedding-v2'
    | 'text-embedding-async-v2';

  export interface EmbeddingCreateParams {
    /**
     * 模型
     */
    model: EmbeddingModel;

    /**
     * 输入文本
     */
    input: string | Array<string> | Array<number> | Array<Array<number>>;

    /**
     * 文本转换为向量后可以应用于检索、聚类、分类等下游任务，对检索这类非对称任务为了达到更好的检索效果
     * 建议区分查询文本（query）和底库文本（document）类型,
     * 聚类、分类等对称任务可以不用特殊指定，采用系统默认值"document"即可
     *
     * @defaultValue 'query'
     */
    type?: 'query' | 'document';
  }
}

type Embedding = {
  text_index: number;
  embedding: number[];
};

type CreateEmbeddingResponse = {
  request_id: string;
  code: string;
  message: string;
  output: {
    embeddings: Embedding[];
  };
  usage: {
    total_tokens: number;
  };
};
