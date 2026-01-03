import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import './AIFeedbackPage.css';

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);

const AIFeedbackPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hey there! What cannabis product are you enjoying right now, or what have you tried recently? I'd love to hear about it.", sender: "ai" }
    ]);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [conversationStage, setConversationStage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const newRecognition = new SpeechRecognition();
            newRecognition.continuous = false; 
            newRecognition.interimResults = true; 
            newRecognition.lang = 'en-US'; 

            newRecognition.onstart = () => {
                setIsListening(true);
                setInput('Listening...');
            };

            newRecognition.onresult = (event: { resultIndex: any; results: string | any[]; }) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                setInput(finalTranscript || interimTranscript);
            };

            newRecognition.onend = () => {
                setIsListening(false);
                if (input === 'Listening...') {
                    setInput('');
                }
            };

            newRecognition.onerror = (event: { error: any; }) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                setInput('Error during speech recognition. Please try again.');
            };

            setRecognition(newRecognition);
        } else {
            console.warn('Speech Recognition not supported in this browser.');
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, []); 

    const handleMicClick = () => {
        if (isListening) {
            recognition?.stop();
            setIsListening(false);
        } else {
            if (recognition) {
                setInput(''); 
                recognition.start();
                setIsListening(true); 
            } else {
                alert('Speech recognition is not supported or not initialized.');
            }
        }
    };

    const gemini = async (prompt: string) => {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setIsLoading(true);
        setInput('');

        try {
            const aiResponse = await gemini(userMessage.text);
            setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
            setApiError(null);
        } catch (error: any) {
            const statusCode = error.status || error.response?.status;
            if (statusCode) {
                let errorMessage = `Error Code: ${statusCode}. "${error.message}".`;
                setApiError(errorMessage);
                setMessages((prevMessages) => [...prevMessages, { text: errorMessage, sender: 'ai' }]);
            }
            setApiError(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="ai-feedback-chat-page">
            <div className="chat-container">
                <div className="message-list">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {message.sender === 'ai' ? (
                                <div dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
                            ) : (
                                message.text
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message ai thinking">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="input-area">
                <form onSubmit={handleSendMessage} className="text-input-form">
                    <textarea
                        className="text-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type or speak your feedback here..."
                        rows={1}
                    />
                    <button type="submit" className="send-button" disabled={!input.trim() || isLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="send-icon">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                    <div className="microphone-icon-container" onClick={handleMicClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="microphone-icon"
                        >
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AIFeedbackPage;