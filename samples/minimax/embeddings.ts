import { MinimaxAI } from '../../src';

const ai = new MinimaxAI();

async function main() {
  const embedding = await ai.embeddings.create({
    model: 'embo-01',
    input: ['推荐一些美食', '给我讲个故事'],
  });

  console.log(embedding);
}

main();
