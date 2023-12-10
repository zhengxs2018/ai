import { MinimaxAI } from '../../../src';
import { saveFile } from '../../shared';

const ai = new MinimaxAI();

async function main() {
  const response = await ai.audio.speech.create({
    model: 'speech-01',
    input: '推荐一些美食',
    voice: 'male-qn-qingse',
  });

  saveFile(response.body, 'minimax-audio-test.mp3');
}

main();
