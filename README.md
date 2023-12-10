# @zhengxs/ai

[![Typescript](https://img.shields.io/badge/lang-typescript-informational?style=flat-square)](https://www.typescriptlang.org)[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)[![npm package](https://img.shields.io/npm/v/@zhengxs/ai.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/ai)[![npm downloads](https://img.shields.io/npm/dt/@zhengxs/ai.svg?style=flat-square)](https://www.npmjs.com/package/@zhengxs/ai)![License](https://img.shields.io/npm/l/@zhengxs/ai.svg?style=flat-square)

> 开发中

集成 **文心一言**，**通义千问** 等国内大模型的 API，并适配为 OpenAI 的输入与输出。

## 特性

- 支持多种大模型的调用
- 适配 OpenAI 的输入与输出

## 安装

```sh
$ npm install --save @zhengxs/ai

# or
$ yarn add @zhengxs/ai
```

## 使用

在这里获取你的 [accessToken](https://aistudio.baidu.com/index/accessToken) 值。

```ts
import { ErnieAI } from '@zhengxs/ai';

const client = new ErnieAI({
  apiKey: 'My API Key', // defaults to process.env["EB_API_KEY"]
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'ernie-bot-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

### 支持流式

```ts
import { ErnieAI } from '@zhengxs/ai';

const client = new ErnieAI();

async function main() {
  const stream = await client.chat.completions.create({
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

## 文档

- [文心一言](./doc/ernie.md)
- [通义千问](./doc/qwen.md)
- [讯飞星火](./doc/spark.md)
- [Minimax](./doc/minimax.md)
- [ImagineArt](./doc/vyro.md)

## 关联项目

- [wechaty-plugin-assistant](https://github.com/zhengxs2018/wechaty-plugin-assistant) 基于 wechaty 的插件，帮助开发者快速实现一个智能对话机器人。

## 待办

- [x] 百度文心一言大模型 [百度飞桨分发](https://aistudio.baidu.com/cooperate/yiyan)
  - [x] Chat
  - [x] Embeddings
  - [ ] ~~Images~~ 飞浆平台不支持
- [x] [阿里通义千问大模型](https://tongyi.aliyun.com/)
  - [x] Chat 支持 [通义千问 VL](https://help.aliyun.com/zh/dashscope/developer-reference/qwen-vl-plus) 模型
  - [x] Embeddings
  - [ ] ~~Audio~~ 等 [文档](https://help.aliyun.com/zh/dashscope/developer-reference/sambert-speech-synthesis) 的请求地址补全后再尝试
  - [ ] Images
    - [x] generate
- [x] [讯飞星火认知大模型](https://xinghuo.xfyun.cn/)
  - [x] Chat
  - [ ] ~~Embeddings~~ 未获得资格
  - [ ] ~~Images~~ 未获得资格
- [x] [腾讯混元大模型](https://hunyuan.tencent.com/)
  - [x] Chat
- [x] [Minimax](https://api.minimax.chat/)
  - [x] Chat
  - [x] Embeddings
  - [ ] Audio
    - [x] speech.create
  - [ ] Files
  - [ ] Retrieval（知识库检索）
- [x] [ImagineArt](https://platform.imagine.art/api-reference)
  - [x] Images
    - [ ] createVariation
    - [x] edit
    - [x] generate
    - [x] upscale
    - [ ] restoration

## License

MIT
