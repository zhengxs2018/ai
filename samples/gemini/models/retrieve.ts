import { GeminiAI } from '../../../src';

const ai = new GeminiAI();

async function main() {
  const model = await ai.models.retrieve('gemini-pro');

  console.log(model);
}

main();
