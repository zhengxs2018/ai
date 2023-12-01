import { VYroAI } from '../../../src';
import { saveFile } from '../../shared';

const ai = new VYroAI();

async function main() {
  const image = await ai.images.generate({
    prompt: 'cat',
  });

  saveFile(image.data[0].binary!);
}

main();
