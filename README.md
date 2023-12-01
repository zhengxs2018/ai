# @zhengxs/ai

[![Typescript](https://img.shields.io/badge/lang-typescript-informational?style=flat-square)](https://www.typescriptlang.org)[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)[![npm package](https://img.shields.io/npm/v/@zhengxs/ai.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/ai)[![npm downloads](https://img.shields.io/npm/dt/@zhengxs/ai.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/ai)![License](https://img.shields.io/npm/l/@zhengxs/ai.svg?style=flat-square)

> 开发中

集成 文心一言，通义千问 等国内大模型 API，并且适配为 OpenAI 的输入与输出。

## 安装

```sh
$ npm install --save @zhengxs/ai

# or
$ yarn add @zhengxs/ai
```

## 使用

### 文心一言

在这里获取你的 [accessToken](https://aistudio.baidu.com/index/accessToken) 值。

```ts
import { ErnieAI } from '@zhengxs/ai';

const ai = new ErnieAI({
  apiKey: 'My API Key', // defaults to process.env["EB_API_KEY"]
});

async function main() {
  const chatCompletion = await ai.chat.completions.create({
    model: 'ernie-bot-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

**支持流式**

```ts
import { ErnieAI } from '@zhengxs/ai';

const ai = new ErnieAI();

async function main() {
  const stream = await ai.chat.completions.create({
    model: 'ernie-bot-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
```

### 通义千问

在这里获取你的 [apiKey](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key) 值。

```ts
import { QWenAI } from '@zhengxs/ai';

const ai = new QWenAI({
  apiKey: 'My API Key', // defaults to process.env["QWEN_API_KEY"]
});

async function main() {
  const chatCompletion = await ai.chat.completions.create({
    model: 'qwen-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

## 待办

- [x] 百度文心一言大模型 [百度飞浆分发](https://aistudio.baidu.com/cooperate/yiyan)
  - [x] ChatCompletion
  - [x] Embedding
- [x] 阿里通义千问大模型
  - [x] ChatCompletion
  - [ ] Embedding
- [x] 讯飞星火认知大模型
  - [x] ChatCompletion
  - [ ] Embedding
  - [ ] Images
- [x] 腾讯混元大模型
  - [x] ChatCompletion
- [x] [ImagineArt](https://platform.imagine.art/api-reference)
  - [x] Images
    - [ ] createVariation
    - [x] edit
    - [x] generate
    - [x] upscale
    - [ ] restoration

## License

MIT
