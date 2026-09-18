import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Refines the input text using Gemini to make it professional and polished.
 * @param {string} text - The raw voice transcript.
 * @param {string} apiKey - The Gemini API key.
 * @returns {Promise<string>} - The refined text.
 */
export const refineText = async (text, apiKey) => {
    if (!text || !text.trim()) return "";
    if (!apiKey) {
        throw new Error("Please enter your Gemini API Key in the Welcome Screen.");
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
                return response.text();
            } catch (error) {
                console.warn(`Model ${modelName} failed:`, error.message);
                lastError = error;
            }
        }

        throw new Error(`Unable to access any models. Ensure your API Key is valid and the "Generative Language API" is enabled in your Google Cloud Console. (Last error: ${lastError?.message})`);

    } catch (error) {
        console.error("Gemini Service Error:", error);
        throw new Error(error.message);
    }
};
