import { useState, useEffect, useRef } from 'react';
import './AudioRecorder.css';

const AudioRecorder = ({ isRecording, setIsRecording, onTranscriptChange }) => {
    const recognitionRef = useRef(null);
    const [error, setError] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    const isRecordingRef = useRef(isRecording);

    // Keep ref in sync with prop for access in callbacks
    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);

    useEffect(() => {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            console.error('Speech Recognition API not supported in this browser.');
            setError('Browser not supported. Please use the latest Chrome, Edge, or Safari.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        // Configure recognition settings
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            console.log('Speech recognition started');
            setError('');
        };

        recognition.onresult = (event) => {
            let finalFragment = '';
            let interimFragment = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const fragment = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalFragment += fragment;
                } else {
                    interimFragment += fragment;
                }
            }

            if (finalFragment || interimFragment) {
                onTranscriptChange(finalFragment, interimFragment);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            
            switch (event.error) {
                case 'not-allowed':
                    setError('Microphone access denied. Please click the "lock" icon in the address bar and allow microphone access.');
                    setIsRecording(false);
                    break;
                case 'no-speech':
                    // Just log, the onend listener will handle restarting if needed
                    console.warn('No speech detected.');
                    break;
                case 'network':
                    setError('Network error: Speech recognition requires an internet connection.');
                    setIsRecording(false);
                    break;
                case 'aborted':
                    console.log('Recognition manually aborted.');
                    break;
                default:
                    setError(`Error: ${event.error}`);
                    setIsRecording(false);
                    break;
            }
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            // Auto-restart if we're still supposed to be recording
            if (isRecordingRef.current) {
                try {
                    console.log('Restarting recognition to maintain continuous mode...');
                    recognition.start();
                } catch (e) {
                    // Ignore already-started errors
                    console.warn('Failed to restart recognition:', e.message);
                }
            }
        };

        return () => {
            if (recognition) {
                recognition.abort();
            }
        };
    }, []); // Initialize only on mount

    // Handle Start/Stop based on Prop change
    useEffect(() => {
        if (!recognitionRef.current) return;

        if (isRecording) {
            try {
                recognitionRef.current.start();
            } catch (error) {
                console.log("Start attempted when already running:", error.message);
            }
        } else {
            try {
                recognitionRef.current.stop();
            } catch (error) {
                console.log("Stop attempted when already stopped:", error.message);
            }
        }
    }, [isRecording]);

    // UI Handle
    const handleToggleRecording = () => {
        if (!isSupported) {
            alert('Speech Recognition API not supported in this browser.');
            return;
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className={`audio-recorder-inline ${isRecording ? 'active' : ''}`}>
            {isRecording && <div className="pulse-ring-inline"></div>}
            <button
                className={`mic-button-inline ${isRecording ? 'recording' : ''}`}
                onClick={handleToggleRecording}
                title={isRecording ? "Stop Recording" : "Start Recording"}
                aria-label={isRecording ? "Stop Recording" : "Start Recording"}
                disabled={!isSupported}
            >
                <svg
                    className="mic-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isRecording ? (
                        <rect x="6" y="6" width="12" height="12" rx="2" ry="2" fill="currentColor" />
                    ) : (
                        <>
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </>
                    )}
                </svg>
            </button>
        </div>
    );
};

export default AudioRecorder;

