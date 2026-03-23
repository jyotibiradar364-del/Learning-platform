const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

dotenv.config();

const hf = new HfInference(process.env.HF_TOKEN);

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await hf.chatCompletion({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful and knowledgeable AI Study Assistant for a Learning Management System. Your goal is to help students understand course content, answer questions accurately, and provide clear explanations. Be encouraging and concise."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        const aiResponse = response.choices[0].message.content;
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('AI Chat Error:', error.message);
        res.status(500).json({ error: 'Failed to get response from AI assistant' });
    }
};

module.exports = {
    chatWithAI
};
