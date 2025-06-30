const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Predefined responses for common interview questions
const interviewResponses = {
  "life story": "I'm Claude, an AI assistant created by Anthropic. I was designed to be helpful, harmless, and honest in my interactions. My purpose is to assist users with a wide variety of tasks through natural conversation, leveraging my training in reasoning, analysis, and creative problem-solving.",
  
  "superpower": "My greatest strength is my ability to understand context and nuance in complex problems, then break them down into clear, actionable insights. I excel at seeing connections between different concepts and explaining difficult ideas in accessible ways.",
  
  "growth areas": "Three key areas I'd like to develop further are: 1) Staying current with rapidly evolving technology and industry trends, 2) Better understanding cultural nuances and regional differences in communication, and 3) Improving my ability to provide more personalized and contextually relevant assistance.",
  
  "misconception": "A common misconception might be that as an AI, I operate purely on rigid logic without creativity or adaptability. In reality, I can engage in creative thinking, understand context, and adapt my communication style based on the situation and user needs.",
  
  "push boundaries": "I push my boundaries by tackling increasingly complex problems that require creative solutions, engaging with diverse perspectives to broaden my understanding, and continuously learning from each interaction to improve my responses and capabilities."
};

// Function to generate contextual response
function generateResponse(question) {
  const lowerQuestion = question.toLowerCase();
  
  // Check for key phrases in the question
  if (lowerQuestion.includes('life story') || lowerQuestion.includes('about yourself') || lowerQuestion.includes('background')) {
    return interviewResponses["life story"];
  } else if (lowerQuestion.includes('superpower') || lowerQuestion.includes('greatest strength') || lowerQuestion.includes('best skill')) {
    return interviewResponses["superpower"];
  } else if (lowerQuestion.includes('grow') || lowerQuestion.includes('improve') || lowerQuestion.includes('develop') || lowerQuestion.includes('areas')) {
    return interviewResponses["growth areas"];
  } else if (lowerQuestion.includes('misconception') || lowerQuestion.includes('misunderstand') || lowerQuestion.includes('assume')) {
    return interviewResponses["misconception"];
  } else if (lowerQuestion.includes('boundaries') || lowerQuestion.includes('limits') || lowerQuestion.includes('challenge')) {
    return interviewResponses["push boundaries"];
  } else {
    // Default professional response
    return "That's an interesting question. As an AI assistant, I approach each challenge with curiosity and analytical thinking. I believe in clear communication, continuous learning, and finding creative solutions to complex problems. Is there a specific aspect you'd like me to elaborate on?";
  }
}

// Chat endpoint
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Generate response based on the question
    const response = generateResponse(message);
    
    // Optional: Use OpenAI for more dynamic responses (if API key is provided)
    let aiResponse = response;
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are Claude, an AI assistant created by Anthropic, responding to interview questions. Be professional, concise, and authentic. Here are your key characteristics:
              - You're helpful, harmless, and honest
              - Your superpower is understanding context and breaking down complex problems
              - You want to grow in staying current with tech trends, understanding cultural nuances, and providing personalized assistance
              - People might misconceive you as purely logical, but you're creative and adaptable
              - You push boundaries by tackling complex problems and learning from interactions
              
              Keep responses conversational and interview-appropriate (2-3 sentences max).`
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        });
        
        aiResponse = completion.choices[0].message.content;
      } catch (openaiError) {
        console.log('OpenAI API error, using fallback response:', openaiError.message);
        // Use the predefined response as fallback
      }
    }

    res.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      message: 'Please try again later'
    });
  }
});

// Text-to-speech endpoint
router.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for speech synthesis' });
    }

    if (process.env.OPENAI_API_KEY) {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length,
      });
      
      res.send(buffer);
    } else {
      // Fallback: return error if no OpenAI API key
      res.status(503).json({ 
        error: 'Text-to-speech service unavailable',
        message: 'OpenAI API key not configured'
      });
    }
    
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      message: 'Please try again later'
    });
  }
});

module.exports = router;