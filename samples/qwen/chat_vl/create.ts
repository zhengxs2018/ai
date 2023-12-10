import { QWenAI } from '../../../src';

const qwenai = new QWenAI();

async function main() {
  const chatCompletion = await qwenai.chat.completions.create({
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
