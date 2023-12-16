import { GeminiAI } from '../../../src';

const client = new GeminiAI();

async function main() {
  const stream = await client.chat.completions.create({
    stream: true,
    model: 'gemini-pro',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}

main();
