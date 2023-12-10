# 混元助手

在这里获取你的 [API密钥](https://console.cloud.tencent.com/cam/capi) 。

## 通用对话

当前支持 `hunyuan` 模型。

```ts
import { HunYuanAI } from '@zhengxs/ai';

const client = new HunYuanAI({
  appId: 'My APP ID', // defaults to process.env["HUNYUAN_APP_ID"]
  secretId: 'My Secret ID', // defaults to process.env["HUNYUAN_SECRET_ID"]
  secretKey: 'My Secret Key', // defaults to process.env["HUNYUAN_SECRET_KEY"]
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'hunyuan',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
}

main();
```

### 支持流式

```ts
import { HunYuanAI } from '@zhengxs/ai';

const client = new HunYuanAI();

async function main() {
  const stream = await client.chat.completions.create({
    model: 'hunyuan',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
```
