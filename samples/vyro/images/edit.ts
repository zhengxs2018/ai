import { VYroAI } from '../../../src';
import { getMediaFile, saveFile } from '../../shared';

const ai = new VYroAI();

async function main() {
  const image = await ai.images.edit({
    prompt: 'Add a Santa hat to this cat',
    image: getMediaFile('cat.png'),
  });

  saveFile(image.data[0].binary!);
}

main();
