import { GeminiAI } from '../../../src';

const ai = new GeminiAI();

async function main() {
  const chatCompletion = await ai.chat.completions.create({
    model: 'gemini-pro',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
