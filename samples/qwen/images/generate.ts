import { QWenAI } from '../../../src';
import { downloadImage } from '../../shared';

const ai = new QWenAI();

async function main() {
  const { data } = await ai.images.generate({
    prompt: 'cat',
  });

  for await (const image of data) {
    downloadImage(image.url!);
  }
}

main();
