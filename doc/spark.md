# 讯飞星火

通过 [星火API](https://xinghuo.xfyun.cn/sparkapi) 申请服务，进入 **服务管理 -> 模型版本首页**，通过模型首页拿到 **服务接口认证信息**。

> [!IMPORTANT]
> 注意：不同模型的 **服务接口认证信息** 是独立的。

## 在 Node.js 中使用

星火模型使用的是 **WebSocket** 技术，而 SDK 为了适配 Edge 环境，使用原生的
[globalThis.WebSocket][mdn:WebSocket] 对象.

所以在 Node.js 环境，需要安装使用 [ws][npm:ws] 模块填充当前环境。

### 安装前置依赖

```sh
# With NPM
$ npm i -S ws

# With YARN
$ yarn add ws

# With PNPM
$ pnpm add ws
```

### 填充到全局

```js
import { WebSocket } from 'ws';

// 需要在 new SparkAI 之前调用
globalThis.WebSocket = WebSocket;
```

## 通用对话

当前支持 `spark-1.5 | spark-2 | spark-3` 模型。

```ts
import { SparkAI } from '@zhengxs/ai';

const client = new SparkAI({
  appId: 'My App ID', // defaults to process.env["SPARK_APP_ID"]
  apiKey: 'My API Key', // defaults to process.env["SPARK_API_KEY"]
  apiSecret: 'My API Secret', // defaults to process.env["SPARK_API_SECRET"]
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'spark-1.5',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

### 支持流式

```ts
import { SparkAI } from '@zhengxs/ai';

const client = new SparkAI();

async function main() {
  const stream = await client.chat.completions.create({
    model: 'spark-1.5',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
```

## 图片生成

因为没有资格，虽然有实现，但无法测试。

[mdn:WebSocket]: https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
[npm:ws]: https://github.com/websockets/ws
