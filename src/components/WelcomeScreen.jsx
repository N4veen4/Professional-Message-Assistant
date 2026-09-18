import React, { useState } from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ apiKey, setApiKey }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSaveKey = () => {
        if (inputValue.trim()) {
            localStorage.setItem('gemini_api_key', inputValue.trim());
            setApiKey(inputValue.trim());
            setInputValue('');
        }
    };

    const handleClearKey = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
    };

    return (
        <div className="welcome-container">
            <div className="welcome-hero-icon">
                <span className="wave">(((</span>
                <div className="hero-mic-circle">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                </div>
                <span className="wave">)))</span>
            </div>
            
            <h1 className="welcome-title">Hello, how can I help you today?</h1>
            <p className="welcome-subtitle">
                I am your Professional Message Assistant. I can transcribe your speech<br />
                and polish it into clear, professional English.
            </p>

            {!apiKey ? (
                <div className="api-key-section">
                    <p className="api-key-instruction">Please enter your Gemini API Key to continue:</p>
                    <div className="api-key-input-group">
                        <input
                            type="password"
                            placeholder="Enter Gemini API Key..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="api-key-input"
                        />
                        <button onClick={handleSaveKey} className="api-key-save-btn">Save Key</button>
                    </div>
                </div>
            ) : (
                <div className="api-key-section">
                    <p className="api-key-status">✅ API Key is configured</p>
                    <button onClick={handleClearKey} className="api-key-clear-btn">Clear Key</button>
                </div>
            )}
            
            <div className="welcome-hints">
                <div className="hint-card">
                    <div className="hint-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    </div>
                    <p>Click the microphone to start recording your voice</p>
                    <svg className="hint-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 16 16 12 12 8"></polyline>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </div>
                <div className="hint-card">
                    <div className="hint-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                            <line x1="6" y1="8" x2="6.01" y2="8"></line>
                            <line x1="10" y1="8" x2="10.01" y2="8"></line>
                            <line x1="14" y1="8" x2="14.01" y2="8"></line>
                            <line x1="18" y1="8" x2="18.01" y2="8"></line>
                            <line x1="6" y1="12" x2="6.01" y2="12"></line>
                            <line x1="10" y1="12" x2="10.01" y2="12"></line>
                            <line x1="14" y1="12" x2="14.01" y2="12"></line>
                            <line x1="18" y1="12" x2="18.01" y2="12"></line>
                            <line x1="8" y1="16" x2="16" y2="16"></line>
                        </svg>
                    </div>
                    <p>Or type your message directly in the input box below</p>
                    <svg className="hint-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 16 16 12 12 8"></polyline>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </div>
                <div className="hint-card">
                    <div className="hint-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                    </div>
                    <p>Hit polish to instantly refine your message</p>
                    <svg className="hint-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 16 16 12 12 8"></polyline>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
