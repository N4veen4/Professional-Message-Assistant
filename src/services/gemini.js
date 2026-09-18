/**
 * Refines the input text using Gemini to make it professional and polished.
 * @param {string} text - The raw voice transcript.
 * @returns {Promise<string>} - The refined text.
 */
export const refineText = async (text) => {
    if (!text || !text.trim()) return "";
    
    try {
        const response = await fetch('/api/refine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to refine text");
        }

        return data.result;
    } catch (error) {
        console.error("Gemini Service Error:", error);
        throw new Error(error.message);
    }
};
