import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('🚀 Farm2Table AI API is running!');
});

// Gemini AI Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  const { userMessage, productContext } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'No userMessage provided' });
  }

  try {
    // Replace with your actual Gemini API call
    const response = await fetch('https://api.gemini.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        context: productContext,
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.reply || 'Sorry, AI could not generate a description.',
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'AI server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Farm2Table AI API running on port ${PORT}`);
});
