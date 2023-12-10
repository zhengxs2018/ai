# Vyro

可以通过其自家产品 [imagine.art](https://www.imagine.art) 体验，在 [这里](https://platform.imagine.art/dashboard) 获取你的 API Key。

> [!TIP]
> 此服务不支持聊天

## 文生图

支持 `imagine-v5 | anime-v5 | imagine-v4.1 | imagine-v4 | imagine-v3 | imagine-v1 | realistic | anime | portrait | sdxl-1.0` 模型;

```js
import path from 'node:path';
import { Readable } from 'node:stream';
import { createWriteStream } from 'node:fs';

import { VYroAI } from '@zhengxs/ai';

const client = new VYroAI({
  apiKey: 'My API Key', // defaults to process.env["VYRO_API_KEY"]
});

async function main() {
  const image = await client.images.generate({
    model: 'imagine-v5',
    prompt: 'cat',
  });

  const data = image.data[0].binary!

  // 图片保存路径
  const savePath = path.resolve('path/to/file.png');

  // 写入文件内容
  Readable.fromWeb(data).pipe(createWriteStream(savePath));
}

main();
```

### 在 Edge 环境中使用

以 Next.js 为例

```js
// src/app/api/images/generate.ts

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await client.images.generate({
    model: 'imagine-v5',
    prompt: prompt,
  });

  const image = response.data[0].binary!;

  // Respond with the stream
  return new Response(image as globalThis.ReadableStream, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
```

在浏览器中使用

```js
const blob = await fetch('http://localhost:3000/api/images/generate', {
  method: 'POST',
  headers: {
    accept: '*/*',
    'content-type': 'application/json;',
  },
  body: JSON.stringify({ prompt: 'cat' }),
}).then(response => response.blob());

// 转为 image url
const imageUrl = URL.createObjectURL(blob);

// 创建或查询 img 元素
const imageElement = document.createElement('img');

// 显示图片
imageElement.src = imageUrl;

document.body.prepend(imageElement);
```
