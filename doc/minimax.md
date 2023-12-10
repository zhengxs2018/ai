# Minimax

在这里获取你的 [apiKey](https://api.minimax.chat/user-center/basic-information/interface-key) 。

## 通用对话

当前支持 `abab5-chat | abab5.5-chat | abab5-chat-pro` 模型。

```ts
import { MinimaxAI } from '@zhengxs/ai';

const client = new MinimaxAI({
  orgId: 'My API ORG', // defaults to process.env["MINIMAX_API_ORG"]
  apiKey: 'My API Key', // defaults to process.env["MINIMAX_API_KEY"]
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'abab5-chat',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

### 支持流式

```ts
import { MinimaxAI } from '@zhengxs/ai';

const client = new MinimaxAI();

async function main() {
  const stream = await client.chat.completions.create({
    model: 'abab5-chat',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
```

## 语义向量

目前仅支持 `embo-01` 模型

> [!IMPORTANT]
> MiniMax 使用时需要区分是用于 `db` 存储，还是 `query` 查询，默认是 `query`。

```ts
import { MinimaxAI } from '@zhengxs/ai';

const client = new MinimaxAI();

async function main() {
  const response = await client.embeddings.create({
    model: 'embo-01',
    type: 'query', // Default query
    input: 'Your text string goes here',
  });

  console.log(response.data[0].embedding);
}

main();
```

## 语音合成

目前仅支持 `embo-01` 模型

> [!IMPORTANT]
> MiniMax 使用时需要区分是用于 `db` 存储，还是 `query` 查询，默认是 `query`。

```ts
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';

import { MinimaxAI } from '@zhengxs/ai';

const client = new MinimaxAI();

async function main() {
  const response = await ai.audio.speech.create({
    model: 'speech-01',
    input: '推荐一些美食',
    voice: 'male-qn-qingse',
  });

  // 文件保存路径
  const savePath = path.resolve('path/to/audio.mp3');

  // 写入文件内容
  Readable.fromWeb(data).pipe(createWriteStream(savePath));
}

main();
```
