import { SparkAI } from '../../src';

const api = new SparkAI();

async function main() {
  const chatCompletion = await api.chat.completions.create({
    model: 'spark-1.5',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
