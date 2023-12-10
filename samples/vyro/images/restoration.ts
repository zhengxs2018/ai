import { VYroAI } from '../../../src';
import { getTestFile, saveFile } from '../../shared';

const ai = new VYroAI();

async function main() {
  const image = await ai.images.restoration({
    prompt: 'add color',
    image: getTestFile('cat.png'),
    mask: getTestFile('cat1.png'),
  });

  saveFile(image.data[0].binary!);
}

main();
