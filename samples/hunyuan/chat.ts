import { HunYuanAI } from '../../src';

const ai = new HunYuanAI();

async function main() {
  const chatCompletion = await ai.chat.completions.create({
    model: 'hunyuan',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
