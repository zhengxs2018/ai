import { QWenAI } from '../../src';

const qwenai = new QWenAI();

async function main() {
  const chatCompletion = await qwenai.chat.completions.create({
    model: 'qwen-max',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
