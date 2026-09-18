import React from 'react';
import './TextDisplay.css';

const TextDisplay = ({ transcript, interimText, refinedText, onTranscriptEdit }) => {
    return (
        <div className="text-display-container">
            <div className="text-panel">
                <h3>Original Transcript</h3>
                <textarea
                    className="text-area"
                    value={transcript}
                    onChange={(e) => onTranscriptEdit(e.target.value)}
                    placeholder="Speech text will appear here..."
                />
                {interimText && (
                    <div className="interim-text">
                        {interimText}
                    </div>
                )}
            </div>

            {refinedText && (
                <div className="text-panel refined">
                    <div className="panel-header">
                        <h3>✨ Polished Version</h3>
                        <span className="badge">AI Enhanced</span>
                    </div>
                    <div className="refined-content">
                        {refinedText}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextDisplay;
