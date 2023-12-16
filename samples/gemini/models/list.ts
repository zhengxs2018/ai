import { GeminiAI } from '../../../src';

const ai = new GeminiAI();

async function main() {
  const list = await ai.models.list();

  for await (const model of list) {
    console.log(model);
  }
}

main();
