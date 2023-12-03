import type { Agent } from 'node:http';

import { APIClient, type DefaultQuery, type Fetch, type FinalRequestOptions, type Headers } from 'openai/core';

import * as API from './resources';

export interface QWenAIOptions {
  baseURL?: string;
  apiKey?: string;
  timeout?: number | undefined;
  httpAgent?: Agent;
  fetch?: Fetch | undefined;
  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: DefaultQuery;
}

export class QWenAI extends APIClient {
  protected apiKey: string;

  private _options: QWenAIOptions;

  constructor(options: QWenAIOptions = {}) {
    const {
      apiKey = process.env.QWEN_API_KEY || '',
      baseURL = 'https://dashscope.aliyuncs.com/api/v1',
      timeout = 30000,
      fetch = globalThis.fetch,
      httpAgent = undefined,
      ...rest
    } = options;

    super({
      baseURL,
      timeout,
      fetch,
      httpAgent,
      ...rest,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  chat = new API.Chat(this);

  protected override authHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  protected override defaultHeaders(opts: FinalRequestOptions): Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override defaultQuery(): DefaultQuery | undefined {
    return this._options.defaultQuery;
  }
}

export namespace QWenAI {
  export type Chat = API.Chat;
  export type ChatModel = API.ChatModel;
  export type ChatCompletionCreateParams = API.ChatCompletionCreateParams;
  export type ChatCompletionCreateParamsNonStreaming = API.ChatCompletionCreateParamsNonStreaming;
  export type ChatCompletionCreateParamsStreaming = API.ChatCompletionCreateParamsStreaming;
}

export default QWenAI;
