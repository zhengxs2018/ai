import { QWenAI } from '../../src';

const client = new QWenAI();

async function main() {
  const embedding = await client.embeddings.create({
    model: 'text-embedding-v1',
    input: ['推荐一些美食', '给我讲个故事'],
  });

  console.log(embedding.data);
}

main();
