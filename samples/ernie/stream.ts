import { ErnieAI } from '../../src';

const ernie = new ErnieAI();

async function main() {
  const stream = await ernie.chat.completions.create({
    stream: true,
    model: 'ernie-bot',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}

main();
