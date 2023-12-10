import { MinimaxAI } from '../../../src';

const ai = new MinimaxAI();

async function main() {
  const chatCompletion = await ai.chat.completions.create({
    model: 'abab5.5-chat',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
