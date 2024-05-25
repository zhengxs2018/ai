import { QWenAI } from '../../../src';

const qwenai = new QWenAI();

async function main() {
  const completion = await qwenai.completions.create({
    model: 'llama2-7b-chat-v2',
    prompt: 'Say this is a test',
    stream: true,
  });

  for await (const chunk of completion) {
    console.log(chunk);
  }
}

main();
