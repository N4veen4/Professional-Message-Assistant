# TextBuddy (Professional Message Assistant)

TextBuddy is a sleek, modern React application that allows you to transcribe your voice in real-time and uses Google's Gemini AI to instantly polish your rough transcripts into articulate, professional text—perfect for work emails, Slack updates, or formal requests.

## ✨ Features

- 🎤 **Real-Time Speech Recognition**: Seamlessly speak your thoughts out loud. The app captures your voice continuously and displays the text as you speak.
- 🪄 **AI-Powered Polishing**: Uses Google's powerful Gemini AI models to automatically fix grammar, elevate vocabulary, and rephrase your text to sound professional and courteous.
- 🎨 **Modern Light Theme UI**: A clean, distraction-free interface built for focus, featuring high-quality SVG iconography and a beautiful custom layout.
- 🔒 **Secure by Design**: The app uses a custom Express backend to communicate with Google's Gemini AI. Your API key is stored securely in your server's `.env` file and is never exposed to the frontend browser.
- 📝 **Inline Editing**: You can manually type your message or edit your voice transcript directly before sending it to the AI for polishing.
- 📋 **One-Click Copy**: Easily copy your polished results to your clipboard to paste into any email client or chat application.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- A modern web browser that supports the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (Google Chrome, Microsoft Edge, or Safari are recommended).
- A valid [Google Gemini API Key](https://aistudio.google.com/app/apikey).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/N4veen4/Professional-Message-Assistant.git
   cd Professional-Message-Assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API Key:**
   Create a `.env` file in the root directory by renaming `.env.example` or creating a new file:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *(This uses `concurrently` to start both the Vite frontend and Express backend simultaneously)*

5. **Open in browser:**
   Open `http://localhost:5173` (or the port Vite provides) in your browser.

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **Vite** - Next-generation frontend tooling and bundler
- **Express / Node.js** - Backend server to securely handle API requests
- **Google Generative AI SDK** - For connecting to the Gemini LLM
- **Vanilla CSS** - Custom variables and animations for a fast, responsive UI
- **Web Speech API** - Native browser API for voice-to-text recognition

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/N4veen4/Professional-Message-Assistant/issues).

---
*Developed with focus and simplicity to make professional communication effortless.*
