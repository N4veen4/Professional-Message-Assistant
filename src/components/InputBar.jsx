import React, { useEffect, useRef } from 'react';
import AudioRecorder from './AudioRecorder';
import './InputBar.css';

const InputBar = ({ onSendText, isRecording, setIsRecording, onTranscriptChange, transcript, setTranscript, interimText, setInterimText, disabled }) => {
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
        }
    }, [transcript, interimText]);

    const handleSend = () => {
        if (isRecording) {
            setIsRecording(false);
        }
        
        const finalSubmitText = (transcript + (interimText ? ' ' + interimText : '')).trim();
        if (finalSubmitText) {
            onSendText(finalSubmitText);
            // We keep the transcript here if they want to edit it, or clear it if we want them to start over.
            // Let's keep it until they clear it or send a new one. But actually, they might want it cleared?
            // Usually, after sending, you clear the input for the next prompt.
            // But since there's no chat, just one result, let's keep it so they can see what they asked.
            // Wait, if they hit polish, it's submitted.
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const displayValue = transcript + (interimText ? (transcript ? ' ' : '') + interimText : '');

    const handleTextChange = (e) => {
        setTranscript(e.target.value);
        setInterimText(''); // clear interim if user types
    };

    return (
        <div className="input-bar-wrapper">
            <div className={`input-bar-container ${isRecording ? 'is-recording' : ''} ${disabled ? 'disabled' : ''}`}>
                <div className="input-mic-wrapper">
                    <AudioRecorder 
                        isRecording={isRecording} 
                        setIsRecording={setIsRecording} 
                        onTranscriptChange={onTranscriptChange} 
                    />
                </div>
                
                <textarea
                    ref={textareaRef}
                    className="input-textarea"
                    placeholder="Type a message or click mic to speak..."
                    value={displayValue}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    rows="1"
                />

                <button 
                    className="send-btn" 
                    onClick={handleSend}
                    disabled={disabled || (!displayValue.trim() && !isRecording)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
            <div className="input-footer">
                Professional Message Assistant can make mistakes. Consider verifying important information.
            </div>
        </div>
    );
};

export default InputBar;
