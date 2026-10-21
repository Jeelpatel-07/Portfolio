const OpenAI = require('openai');

const generateDescription = async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You write concise 1-2 sentence task descriptions.' },
        { role: 'user', content: `Write a short task description for: ${title}` }
      ],
      max_tokens: 80
    });
    const description = completion.choices[0].message.content.trim();
    res.json({ success: true, description });
  } catch (err) {
    console.error('[AI Error]', err.message);
    res.status(200).json({
      success: false,
      fallback: true,
      description: '',
      message: 'AI unavailable, please write the description manually.'
    });
  }
};

module.exports = { generateDescription };
