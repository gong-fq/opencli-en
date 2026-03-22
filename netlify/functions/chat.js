const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { text } = JSON.parse(event.body);

  try {
    const response = await axios.post('https://api.deepseek.com/chat/completions', {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
         content: 
`你是一位深耕英语语言学的导师。请按以下结构分析文本：
### 0. 中文译文 (Chinese Translation)
- 提供地道、严谨的中文翻译。
### 1. 词汇精析 (Vocabulary & IPA [RP])
- 提取高阶词汇，给出 RP 标准音标和简明义项。
### 2. 句法解构 (Syntactic Analysis)
- 选取一个长难句，标注主谓宾，拆解从句逻辑。
          ### 3. 风格与语用 (Style & Usage)
          - 说明文本的语体色彩（如：正式书面语、地道习语等）。`
        },
        { role: "user", content: text }
      ],
      temperature: 0.3 // 降低随机性，保证音标和语法解析的严谨性
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.data.choices[0].message.content })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};