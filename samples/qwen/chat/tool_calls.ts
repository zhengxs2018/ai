import { QWenAI } from '../../../src';

const qwenai = new QWenAI();

// 模拟天气查询工具
// 北京天气如何？ => 北京今天是晴天
function get_current_weather(location: string) {
  return `${location}今天是晴天`;
}

// 查询当前时间的工具
// 现在几点了？ => 当前时间：2024-04-15 17:15:18
function get_current_time() {
  //  格式化当前日期和时间
  const formatted_time = new Date().toLocaleString();
  // 返回格式化后的当前时间
  return `当前时间：${formatted_time}`;
}

async function main() {
  const chatCompletion = await qwenai.chat.completions.create({
    // 当前支持的模型包括
    // - qwen-turbo
    // - qwen-plus
    // - qwen-max
    // - qwen-max-longcontext
    model: 'qwen-turbo',
    messages: [{ role: 'user', content: '北京天气如何？' }],
    tools: [
      // 工具1 获取当前时刻的时间
      {
        type: 'function',
        function: {
          name: 'get_current_time',
          description: '当你想知道现在的时间时非常有用。',
          parameters: {}, // 因为获取当前时间无需输入参数，因此parameters为空字典
        },
      },
      // 工具2 获取指定城市的天气
      {
        type: 'function',
        function: {
          name: 'get_current_weather',
          description: '当你想查询指定城市的天气时非常有用。',
          parameters: {
            // 查询天气时需要提供位置，因此参数设置为location
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: '城市或县区，比如北京市、杭州市、余杭区等。',
              },
            },
          },
          // @ts-expect-error
          required: ['location'],
        },
      },
    ],
  });

  const choice = chatCompletion.choices[0];

  if (choice.finish_reason === 'tool_calls') {
    const tool = choice.message.tool_calls![0];

    if (tool.function.name === 'get_current_weather') {
      const args = JSON.parse(tool.function.arguments);
      const location = args['properties']['location'];
      console.log('get_current_weather', get_current_weather(location));
    } else if (tool.function.name === 'get_current_time') {
      console.log('get_current_time', get_current_time());
    } else {
      console.warn('unknown tool', tool);
    }
  } else {
    console.log('Assistant: ', choice.message.content);
  }
}

main();
