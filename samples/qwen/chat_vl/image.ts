import { QWenAI } from '../../../src';

const client = new QWenAI();

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'qwen-vl-v1',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png' },
          },
          { type: 'text', text: '这是什么图?' },
        ],
      },
    ],
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
