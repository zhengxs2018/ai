import { HunYuanAI } from '../../src';

const qwenai = new HunYuanAI();

async function main() {
  const stream = await qwenai.chat.completions.create({
    stream: true,
    model: 'hunyuan',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}

main();
