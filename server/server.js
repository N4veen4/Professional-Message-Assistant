import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/refine', async (req, res) => {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
        return res.status(400).json({ error: "Text is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY environment variable is missing.");
        return res.status(500).json({ error: "Server configuration error" });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        const CANDIDATE_MODELS = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash-001",
            "gemini-1.5-pro",
            "gemini-1.5-pro-latest",
            "gemini-1.5-pro-001",
            "gemini-pro",
            "gemini-2.5-flash",
            "gemini-2.5-flash-latest"
        ];

        let lastError = null;

        for (const modelName of CANDIDATE_MODELS) {
            try {
                console.log(`Attempting to use model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const prompt = `
          You are a professional grammar and communication assistant. 
          Your task is to take the following voice transcript and rewrite it to be grammatically correct, polite, and clearly articulated.
          - Fix any grammatical or spelling mistakes.
          - Improve the vocabulary and phrasing to sound natural and professional.
          - DO NOT format the output as a formal letter or email (e.g., do not add "Dear...", "Sincerely,", or subject lines) unless the user explicitly included them in their original transcript. Keep it as a direct statement or message.
          - Output ONLY the final polished text. Do not include any conversational filler or introductions.
          
          Transcript: "${text}"
        `;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                return res.json({ result: response.text() });
            } catch (error) {
                console.warn(`Model ${modelName} failed:`, error.message);
                lastError = error;
            }
        }

        const errorMsg = `Gemini Error: Unable to access any models. Ensure your API Key is valid and the "Generative Language API" is enabled in your Google Cloud Console. (Last error: ${lastError?.message})`;
        console.error(errorMsg);
        return res.status(500).json({ error: errorMsg });

    } catch (error) {
        console.error("Gemini Service Error:", error);
        return res.status(500).json({ error: `Gemini Error: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
