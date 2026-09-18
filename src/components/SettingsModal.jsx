import React, { useState } from 'react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, apiKey, saveApiKey }) => {
    const [tempKey, setTempKey] = useState(apiKey);

    if (!isOpen) return null;

    const handleSave = () => {
        saveApiKey(tempKey);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Settings</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <label htmlFor="api-key">Gemini API Key</label>
                    <input
                        id="api-key"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        value={tempKey}
                        onChange={(e) => setTempKey(e.target.value)}
                    />
                    <p className="help-text">Your API key is stored securely in your browser's local storage.</p>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
