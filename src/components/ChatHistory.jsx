import React, { useState, useRef, useEffect } from 'react';
import './ChatHistory.css';

const Message = ({ msg, onEdit, onCopy, onRepolish }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(msg.text);
    const textareaRef = useRef(null);

    const isUser = msg.type === 'user';

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
            textareaRef.current.focus();
        }
    }, [isEditing, editValue]);

    const handleSave = () => {
        setIsEditing(false);
        if (editValue !== msg.text) {
            onEdit(msg.id, editValue);
            if (isUser) {
                onRepolish(msg.id, editValue);
            }
        }
    };

    return (
        <div className={`message-wrapper ${isUser ? 'user-message' : 'ai-message'}`}>
            <div className="message-avatar">
                {isUser ? '👤' : '✨'}
            </div>
            <div className="message-content-box">
                <div className="message-header">
                    <span className="message-sender">{isUser ? 'You' : 'Assistant'}</span>
                </div>
                
                {isEditing ? (
                    <div className="message-edit-mode">
                        <textarea
                            ref={textareaRef}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="edit-textarea"
                        />
                        <div className="edit-actions">
                            <button className="btn-small secondary" onClick={() => { setIsEditing(false); setEditValue(msg.text); }}>Cancel</button>
                            <button className="btn-small primary" onClick={handleSave}>Save & Polish</button>
                        </div>
                    </div>
                ) : (
                    <div className="message-text">
                        {msg.isPolishing ? (
                            <span className="typing-indicator">Polishing<span>.</span><span>.</span><span>.</span></span>
                        ) : (
                            <p>{msg.text}</p>
                        )}
                    </div>
                )}

                {!msg.isPolishing && !isEditing && (
                    <div className="message-actions">
                        <button className="action-btn" onClick={() => onCopy(msg.text)} title="Copy text">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        {isUser && (
                            <button className="action-btn" onClick={() => setIsEditing(true)} title="Edit text">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ChatHistory = ({ messages, onEditMessage, onCopy, onRepolish }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-history-container">
            {messages.map((msg) => (
                <Message 
                    key={msg.id} 
                    msg={msg} 
                    onEdit={onEditMessage} 
                    onCopy={onCopy} 
                    onRepolish={onRepolish}
                />
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatHistory;
