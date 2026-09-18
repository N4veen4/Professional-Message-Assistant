import React from 'react';
import './Controls.css';

const Controls = ({ onRefine, onCopy, onClear, isProcessing, hasText }) => {
    return (
        <div className="controls-container">
            <button
                className="btn btn-primary"
                onClick={onRefine}
                disabled={isProcessing || !hasText}
            >
                {isProcessing ? 'Polishing...' : '✨ Polish Text'}
            </button>

            <div className="secondary-actions">
                <button
                    className="btn btn-secondary"
                    onClick={onCopy}
                    disabled={!hasText}
                    title="Copy to Clipboard"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>

                <button
                    className="btn btn-danger"
                    onClick={onClear}
                    disabled={!hasText}
                    title="Clear Text"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Controls;
