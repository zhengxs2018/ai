import { QWenAI } from '../../../src';

const qwenai = new QWenAI();

async function main() {
  const chatCompletion = await qwenai.chat.completions.create({
    model: 'llama2-7b-chat-v2',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.dir(chatCompletion, {
    depth: 5,
  });
}

main();
