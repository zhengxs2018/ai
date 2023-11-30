import { SparkAI } from '../../src';

const ai = new SparkAI();

async function main() {
  const stream = await ai.chat.completions.create({
    stream: true,
    model: 'spark-1.5',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || '');
  }
}

main();
