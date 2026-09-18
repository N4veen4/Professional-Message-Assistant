import React from 'react';
import './ResultScreen.css';

const ResultScreen = ({ polishedResult, isPolishing, onCopy, onClear }) => {
    return (
        <div className="result-container">
            <div className="result-card">
                <div className="result-header">
                    <div className="result-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <h2>Polished Result</h2>
                    </div>
                    <div className="result-actions">
                        <button className="icon-btn" onClick={onCopy} title="Copy to clipboard" disabled={isPolishing}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <button className="icon-btn danger" onClick={onClear} title="Clear and Start Over">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="result-body">
                    {isPolishing ? (
                        <div className="loading-state">
                            <span className="spinner"></span>
                            <p>Polishing your message...</p>
                        </div>
                    ) : (
                        <p className="polished-text">{polishedResult}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultScreen;
