import React, { useState } from 'react';
import './AIFeedbackPage.css';

const AIFeedbackPage: React.FC = () => {
    const [transcription, setTranscription] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleMicClick = () => {
        if (isListening) {
            // Stop listening logic
            setIsListening(false);
        } else {
            // Start listening logic
            setIsListening(true);
            // Placeholder for speech recognition
            setTimeout(() => {
                setTranscription('User feedback transcription will appear here.');
                setIsListening(false);
            }, 2000);
        }
    };

    return (
        <div className="ai-feedback-page">
            <h2>AI Feedback</h2>
            <p>Speak your feedback, and we'll transcribe it for you.</p>
            <div className="feedback-container">
                <textarea
                    className="feedback-textarea"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    placeholder="Or type your feedback here..."
                />
                <button className={`mic-button ${isListening ? 'listening' : ''}`} onClick={handleMicClick}>
                    🎤
                </button>
            </div>
        </div>
    );
};

export default AIFeedbackPage;
