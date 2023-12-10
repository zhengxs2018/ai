# 通义千问

在这里获取你的
[apiKey](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key)
值。

## 通用对话

当前支持 `qwen-turbo | qwen-plus | qwen-max | qwen-max-1201 | qwen-max-longcontext | baichuan2-7b-chat-v1` 模型。

```ts
import { QWenAI } from '@zhengxs/ai';

const client = new QWenAI({
  apiKey: 'My API Key', // defaults to process.env["QWEN_API_KEY"]
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'qwen-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

### 支持流式

```ts
import { QWenAI } from '@zhengxs/ai';

const client = new QWenAI();

async function main() {
  const stream = await client.chat.completions.create({
    model: 'qwen-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
```

## 文生图

目前仅支持 `wanx-v1` 模型;

```js
import { createWriteStream } from 'node:fs';
import path from 'node:path';

import { QWenAI } from '@zhengxs/ai';

const client = new QWenAI();

async function main() {
  const images = await client.images.generate({
    prompt: 'cat',
  });

  for (const image of images.data) {
    console.log(image.url);
  }
}

main();
```

## 通义千问 VL

[通义千问VL](https://help.aliyun.com/zh/dashscope/developer-reference/qwen-vl-plus) 开源视觉理解大模型Qwen-VL于2023年12月1日发布重大更新，不仅大幅提升通用OCR、视觉推理、中文文本理解基础能力，还能处理各种分辨率和规格的图像，甚至能“看图做题”。

```js
import { createWriteStream } from 'node:fs';
import path from 'node:path';

import { QWenAI } from '@zhengxs/ai';

const client = new QWenAI();

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'qwen-vl-plus',
    messages: [
      {
        role: 'user',
        content: '你好',
      },
    ],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
```

### 携带图片

你可以使用数组携带图片和文字

> [!WARNING]
> 目前发现携带的图片如果无法访问，会直接抛 400 错误

```js
import { createWriteStream } from 'node:fs';
import path from 'node:path';

import { QWenAI } from '@zhengxs/ai';

const client = new QWenAI();

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'qwen-vl-plus',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png' },
          },
          { type: 'text', text: '这是什么图?' },
        ],
      },
    ],
  });

  console.log(chatCompletion.choices[0].message.content);
  //=> "这是一张百度的logo图片。"
}

main();
```

## 语义向量

支持 `text-embedding-v1` 和 `text-embedding-v2` 模型。

```ts
import { QWenAI } from '@zhengxs/ai';

const client = new QWenAI();

const embedding = await client.embeddings.create({
  model: 'text-embedding-v1',
  input: ['推荐一些美食', '给我讲个故事'],
});

console.log(embedding.data);
```
