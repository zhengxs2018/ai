

<div align="center"><a name="readme-top"></a>

<h1>AI SDK</h1>

Integra las API de modelos de lenguaje grandes (LLM) chinos como ERNIE Bot (Baidu), Tongyi Qianwen (Alibaba), Hunyuan (Tencent) y Spark (iFlytek), y se adapta a los formatos de entrada y salida de OpenAI.

[![][npm-types-shield]][npm-types-link]
[![][npm-release-shield]][npm-release-link]
[![][npm-downloads-shield]][npm-downloads-link]
[![][github-releasedate-shield]][github-releasedate-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

[Reportar Error][github-issues-link] · [Solicitar Funcionalidad][github-issues-link]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

<details>
<summary><kbd>Índice</kbd></summary>

#### TOC

- [✨ Funcionalidades](#-funcionalidades)
- [📖 Documentación](#-documentación)
- [📦 Instalación](#-instalación)
- [🔗 Más herramientas](#-más-herramientas)
- [🤝 Contribuciones](#-contribuciones)

<br/>

</details>

## ✨ Funcionalidades

- 🚀 **Inicio rápido**: Fácil de usar, solo necesitas aprender una vez para integrar rápidamente varios modelos de lenguaje grandes.
- 💻 **Integración multi-modelo**: Integra diversos modelos chinos de IA, ofreciendo una amplia selección de modelos de diálogo para adaptarse a diferentes escenarios.
- 💎 **Experiencia amigable**: Sin necesidad de aprender en profundidad, solo proporciona la API Key necesaria y deja que el SDK se encargue del resto.
- 🔌 **Adaptación perfecta**: Compatible con los formatos de entrada y salida de OpenAI, asegurando una integración fluida con otros modelos.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📖 Documentación

- [ERNIE Bot](./doc/ernie.md)
- [Tongyi Qianwen](./doc/qwen.md)
- [Spark](./doc/spark.md)
- [Hunyuan](./doc/hunyuan.md)
- [Minimax](./doc/minimax.md)
- [ImagineArt](./doc/vyro.md)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Instalación

Para instalar `@zhengxs/ai`, ejecuta el siguiente comando:

```bash
$ pnpm install @zhengxs/ai
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 👋 Uso

Obtén tu valor de [token de acceso](https://aistudio.baidu.com/index/accessToken) aquí.

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

### Soporte para streaming

Totalmente compatible con el SDK de OpenAI.

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

## ⌨️ Desarrollo local

Puedes usar GitHub Codespaces para el desarrollo en línea:

[![][github-codespace-shield]][github-codespace-link]

O utiliza los siguientes comandos para el desarrollo local:

```bash
$ git clone https://github.com/zhengxs2018/ai.git
$ cd ai
$ pnpm install
$ pnpm task <path/to/file>
```

**Nota:** Puedes ejecutar directamente archivos de ejemplo de TypeScript utilizando `task`, como `pnpm task ai/samples/qwen/chat/create.ts`.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 Más herramientas

- **[🤖 wechaty-plugin-assistant](https://github.com/zhengxs2018/wechaty-plugin-assistant)** - Con solo tres pasos, puedes implementar rápidamente un bot de diálogo inteligente.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contribuciones

Agradecemos cualquier tipo de contribución. Si estás interesado en contribuir con código, puedes revisar los [Issues][github-issues-link] de GitHub y demostrar tus ideas.

[![][pr-welcome-shield]][pr-welcome-link]

[![][github-contrib-shield]][github-contrib-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🕘 Historial de Estrellas

[![Star History Chart](https://api.star-history.com/svg?repos=zhengxs2018/ai&type=Date)](https://star-history.com/#zhengxs2018/ai&Date)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 Licencia

Copyright © 2023 [zhengxs2018][profile-link]. <br />
Este proyecto tiene licencia [MIT](./LICENSE).

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
