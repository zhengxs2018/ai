import OpenAI from 'openai';

import ErnieAI, { ErnieAIOptions } from './ernie';
import HunYuanAI, { HunYuanAIOptions } from './hunyuan';
import MinimaxAI, { MinimaxAIOptions } from './minimax';
import QWenAI, { QWenAIOptions } from './qwen';
import SparkAI, { SparkAIOptions } from './spark';
import VYroAI, { VYroAIOptions } from './vyro';

export { ErnieAI, HunYuanAI, MinimaxAI, OpenAI, QWenAI, SparkAI, VYroAI };

export type { ErnieAIOptions, HunYuanAIOptions, MinimaxAIOptions, QWenAIOptions, SparkAIOptions, VYroAIOptions };

export {
  OpenAIError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from 'openai';

export * from './resource';
export * from './streaming';
export * from './util';
