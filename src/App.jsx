import { useState, useEffect } from 'react'
import './App.css'
import { refineText } from './services/gemini'
import SettingsModal from './components/SettingsModal'
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(!localStorage.getItem('gemini_api_key'))

  // FIX: Properly accumulate final transcripts without losing them when interim updates
  const handleTranscriptChange = (final, interim) => {
    if (final) {
        setTranscript(prev => (prev ? prev + ' ' : '') + final);
    }
    setInterimText(interim || '');
  }

  const handleSendText = async (text) => {
    if (!apiKey) {
      alert("Please configure your Gemini API Key in Settings first.");
      setIsSettingsOpen(true);
      return;
    }

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

  const saveApiKey = (key) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    localStorage.setItem('gemini_api_key', trimmedKey);
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
        <button className="settings-btn" onClick={() => setIsSettingsOpen(true)} title="Settings">
          <svg className="settings-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </header>

      <main className="main-content">
        {!polishedResult && !isPolishing ? (
          <WelcomeScreen />
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

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKey={apiKey} 
        saveApiKey={saveApiKey} 
      />
    </div>
  )
}

export default App
