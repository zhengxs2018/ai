import { ErnieAI } from '../../src';

const ernie = new ErnieAI();

async function main() {
  const chatCompletion = await ernie.chat.completions.create({
    model: 'ernie-bot',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
