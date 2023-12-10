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
