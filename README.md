# @zhengxs/ai

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

const ernie = new ErnieAI({
  apiKey: 'My API Key', // defaults to process.env["EB_API_KEY"]
});

async function main() {
  const chatCompletion = await ernie.chat.completions.create({
    model: 'ernie-bot-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

**支持流式**

```ts
import { ErnieAI } from '@zhengxs/ai';

const ernie = new ErnieAI();

async function main() {
  const stream = await ernie.chat.completions.create({
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

const ernie = new QWenAI({
  apiKey: 'My API Key', // defaults to process.env["QWEN_API_KEY"]
});

async function main() {
  const chatCompletion = await ernie.chat.completions.create({
    model: 'qwen-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

## 待办

- [x] 文心一言 [百度飞浆](https://aistudio.baidu.com/cooperate/yiyan)
  - [x] ChatCompletion
  - [x] Embedding
- [x] 通义千问
  - [x] ChatCompletion
  - [ ] Embedding

## License

MIT
