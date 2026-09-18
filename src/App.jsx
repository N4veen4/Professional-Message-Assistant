import { useState, useEffect } from 'react'
import './App.css'
import { refineText } from './services/gemini'
import WelcomeScreen from './components/WelcomeScreen'
import ResultScreen from './components/ResultScreen'
import InputBar from './components/InputBar'

function App() {
  const [transcript, setTranscript] = useState('')
  const [interimText, setInterimText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [polishedResult, setPolishedResult] = useState(null)
  const [isPolishing, setIsPolishing] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '')

  // FIX: Properly accumulate final transcripts without losing them when interim updates
  const handleTranscriptChange = (final, interim) => {
    if (final) {
        setTranscript(prev => (prev ? prev + ' ' : '') + final);
    }
    setInterimText(interim || '');
  }

  const handleSendText = async (text) => {
    if (!text.trim()) return;

    // Transition to polishing state
    setPolishedResult(null);
    setIsPolishing(true);

    try {
      const polished = await refineText(text, apiKey);
      setPolishedResult(polished);
    } catch (error) {
      setPolishedResult(`Error: ${error.message}`);
    } finally {
      setIsPolishing(false);
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  }

  const handleClear = () => {
    setTranscript('');
    setInterimText('');
    setPolishedResult(null);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <svg className="header-mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <h1>TextBuddy</h1>
        </div>
      </header>

      <main className="main-content">
        {!polishedResult && !isPolishing ? (
          <WelcomeScreen apiKey={apiKey} setApiKey={setApiKey} />
        ) : (
          <ResultScreen 
            polishedResult={polishedResult} 
            isPolishing={isPolishing} 
            onCopy={() => handleCopy(polishedResult)}
            onClear={handleClear}
          />
        )}
      </main>

      <InputBar 
        onSendText={handleSendText}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        onTranscriptChange={handleTranscriptChange}
        transcript={transcript}
        setTranscript={setTranscript}
        interimText={interimText}
        setInterimText={setInterimText}
        disabled={isPolishing}
      />
    </div>
  )
}

export default App
