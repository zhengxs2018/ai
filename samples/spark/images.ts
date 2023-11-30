import { SparkAI } from '../../src';

const spark = new SparkAI();

async function main() {
  const image = await spark.images.generate({
    prompt: 'cat',
  });

  console.log(image);
}

main();
