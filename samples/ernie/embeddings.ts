import { ErnieAI } from '../../src';

const ernie = new ErnieAI();

async function main() {
  const embedding = await ernie.embeddings.create({
    model: 'ernie-text-embedding',
    input: ['推荐一些美食', '给我讲个故事'],
  });

  console.log(embedding);
}

main();
