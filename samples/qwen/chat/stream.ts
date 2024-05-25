import { QWenAI } from '../../../src';

const qwenai = new QWenAI();

async function main() {
  const stream = await qwenai.chat.completions.create({
    model: 'llama2-7b-chat-v2',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    console.dir(chunk, {
      depth: 5,
    });
  }
}

main();
