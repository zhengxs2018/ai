# 文心一言

在这里获取你的 [accessToken](https://aistudio.baidu.com/index/accessToken) 值。

## 通用对话

当前支持 `ernie-bot | ernie-bot-turbo | ernie-bot-4 | ernie-bot-8k` 模型。

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

## 语义向量

仅支持 `ernie-text-embedding` 模型。

```ts
import { ErnieAI } from '@zhengxs/ai';

const client = new ErnieAI();

async function main() {
  const response = await client.embeddings.create({
    model: 'ernie-text-embedding',
    input: 'Your text string goes here',
  });

  console.log(response.data[0].embedding);
}

main();
```
