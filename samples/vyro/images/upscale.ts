import { VYroAI } from '../../../src';
import { getMediaFile, saveFile } from '../../shared';

const ai = new VYroAI();

async function main() {
  const image = await ai.images.upscale({
    image: getMediaFile('cat.png'),
  });

  saveFile(image.data[0].binary!);
}

main();
