import React, { useState, useRef, useEffect } from 'react';
import './AIFeedbackPage.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyB-WpLqAUqXBpVYSoGIATnSYitc03272gw';
const genAI = new GoogleGenerativeAI(API_KEY);

const AIFeedbackPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Welcome to AI Feedback! How can I help you today?", sender: "ai" }
    ]);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMicClick = () => {
        if (isListening) {
            setIsListening(false);
        } else {
            setIsListening(true);
            setTimeout(() => {
                setInput('User feedback transcription will appear here.');
                setIsListening(false);
            }, 2000);
        }
    };

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, sender: "user" }];
            setMessages(newMessages);
            setInput('');
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
                const result = await model.generateContent(input);
                const response = await result.response;
                const text = response.text();
                setMessages(prevMessages => [...prevMessages, { text, sender: "ai" }]);
            } catch (error) {
                console.error("Error generating content:", error);
                setMessages(prevMessages => [...prevMessages, { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: "ai" }]);
            }
        }
    };

    return (
        <div className="ai-feedback-chat-page">
            <div className="chat-container">
                <div className="message-list">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {message.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="chat-input-container">
                <div className="chat-input">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your feedback here..."
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    />
                    <button className="mic-button" onClick={handleMicClick}>
                        🎤
                    </button>
                    <button className="send-button" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIFeedbackPage;
