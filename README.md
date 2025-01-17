<div align="center"><a name="readme-top"></a>

<h1>AI SDK</h1>

集成 百度文心一言，阿里通义千问，腾讯混元助手 和 讯飞星火认知 等国内大模型的 API，并且适配 OpenAI 的输入与输出。

[![][npm-types-shield]][npm-types-link]
[![][npm-release-shield]][npm-release-link]
[![][npm-downloads-shield]][npm-downloads-link]
[![][github-releasedate-shield]][github-releasedate-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

[Report Bug][github-issues-link] · [Request Feature][github-issues-link]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

<details>
<summary><kbd>目录树</kbd></summary>

#### TOC

- [✨ 功能特性](#-功能特性)
- [📖 使用文档](#-使用文档)
- [📦 安装](#-安装)
- [🔗 更多工具](#-更多工具)
- [🤝 参与贡献](#-参与贡献)

<br/>

</details>

## ✨ 功能特性

- 🚀 **快速开始**: 简单易用，只需一次学习，即可快速接入各种大模型。
- 💻 **多模型集成**: 集成了多种国内大模型，为用户提供丰富的对话模型选择，满足不同场景的需求。
- 💎 **体验友好**: 无需深入学习，只需提供必要的 API Key，剩下的交给 SDK 处理。
- 🔌 **完美适配**: 适配 OpenAI 的输入与输出格式，确保与其他模型的对话无缝对接。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📖 使用文档

- [文心一言](./doc/ernie.md)
- [通义千问](./doc/qwen.md)
- [讯飞星火](./doc/spark.md)
- [混元助手](./doc/hunyuan.md)
- [Minimax](./doc/minimax.md)
- [ImagineArt](./doc/vyro.md)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 安装

要安装 `@zhengxs/ai`，请运行以下命令:

```bash
$ pnpm install @zhengxs/ai
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 👋 使用

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

使用与 OpenAI 的 SDK 完全一致。

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

## ⌨️ 本地开发

可以使用 GitHub Codespaces 进行在线开发：

[![][github-codespace-shield]][github-codespace-link]
[![][open-in-codeanywhere]][open-in-codeanywhere-link]

或者使用以下命令进行本地开发：

```bash
$ git clone https://github.com/zhengxs2018/ai.git
$ cd ai
$ pnpm install
$ pnpm task <path/to/file>
```

**注意** 可以使用 task 直接运行示例的 ts 文件，如 `pnpm task ai/samples/qwen/chat/create.ts`。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 更多工具

- **[🤖 wechaty-plugin-assistant](https://github.com/zhengxs2018/wechaty-plugin-assistant)** - 只需三步，就可以快速实现一个智能对话机器人。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 参与贡献

我们非常欢迎各种形式的贡献。如果你对贡献代码感兴趣，可以查看我们的 GitHub [Issues][github-issues-link] 大展身手，向我们展示你的奇思妙想。

[![][pr-welcome-shield]][pr-welcome-link]

[![][github-contrib-shield]][github-contrib-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🕘 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=zhengxs2018/ai&type=Date)](https://star-history.com/#zhengxs2018/ai&Date)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 License

Copyright © 2023 [zhengxs2018][profile-link]. <br />
This project is [MIT](./LICENSE) licensed.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

[profile-link]: https://github.com/zhengxs2018
[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat-square
[aliyun-dashscope-model-list]: https://help.aliyun.com/zh/dashscope/developer-reference/model-square/
[npm-release-shield]: https://img.shields.io/npm/v/@zhengxs/ai?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[npm-release-link]: https://www.npmjs.com/package/@zhengxs/ai
[npm-downloads-shield]: https://img.shields.io/npm/dt/@zhengxs/ai?labelColor=black&style=flat-square
[npm-downloads-link]: https://www.npmjs.com/package/@zhengxs/ai
[npm-types-shield]: https://img.shields.io/npm/types/@zhengxs/ai?labelColor=black&style=flat-square
[npm-types-link]: https://www.npmjs.com/package/@zhengxs/ai
[github-issues-link]: https://github.com/zhengxs2018/ai/issues
[pr-welcome-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20PR%20WELCOME-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[pr-welcome-link]: https://github.com/zhengxs2018/ai/pulls
[github-contrib-shield]: https://contrib.rocks/image?repo=zhengxs2018%2Fai
[github-contrib-link]: https://github.com/zhengxs2018/ai/graphs/contributors
[github-codespace-shield]: https://github.com/codespaces/badge.svg
[github-codespace-link]: https://codespaces.new/zhengxs2018/ai
[open-in-codeanywhere]: https://codeanywhere.com/img/open-in-codeanywhere-btn.svg
[open-in-codeanywhere-link]:https://app.codeanywhere.com/#https://github.com/zhengxs2018/ai
[npm-release-shield]: https://img.shields.io/npm/v/@zhengxs/ai?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[npm-release-link]: https://www.npmjs.com/package/@zhengxs/ai
[github-releasedate-shield]: https://img.shields.io/github/release-date/zhengxs2018/ai?labelColor=black&style=flat-square
[github-releasedate-link]: https://github.com/zhengxs2018/ai/releases
[github-contributors-shield]: https://img.shields.io/github/contributors/zhengxs2018/ai?color=c4f042&labelColor=black&style=flat-square
[github-contributors-link]: https://github.com/zhengxs2018/ai/graphs/contributors
[github-forks-shield]: https://img.shields.io/github/forks/zhengxs2018/ai?color=8ae8ff&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/zhengxs2018/ai/network/members
[github-stars-shield]: https://img.shields.io/github/stars/zhengxs2018/ai?color=ffcb47&labelColor=black&style=flat-square
[github-stars-link]: https://github.com/zhengxs2018/ai/network/stargazers
[github-issues-shield]: https://img.shields.io/github/issues/zhengxs2018/ai?color=ff80eb&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/zhengxs2018/ai/issues
[github-license-shield]: https://img.shields.io/github/license/zhengxs2018/ai?color=white&labelColor=black&style=flat-square
[github-license-link]: https://github.com/zhengxs2018/ai/blob/main/LICENSE
