import { QWenAI } from '../../src';

const qwenai = new QWenAI();

async function main() {
  const stream = await qwenai.chat.completions.create({
    stream: true,
    model: 'qwen-max',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}

main();
