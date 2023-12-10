import { MinimaxAI } from '../../../src';

const ai = new MinimaxAI();

async function main() {
  const stream = await ai.chat.completions.create({
    stream: true,
    model: 'abab5.5-chat',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}

main();
