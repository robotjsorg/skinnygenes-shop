import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { FaArrowUp, FaMicrophone, FaMicrophoneSlash, FaCopy, FaVolumeUp, FaVolumeOff } from 'react-icons/fa';
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
  const [isLoading, setIsLoading] = useState(false);
  const [readingMessageIndex, setReadingMessageIndex] = useState<number | null>(null);

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

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
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
    } catch (error: any) {
      const statusCode = error.status || error.response?.status;
      if (statusCode) {
        let errorMessage = `Error Code: ${statusCode}. "${error.message}".`;
        setMessages((prevMessages) => [...prevMessages, { text: errorMessage, sender: 'ai' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleReadAloud = (text: string, index: number) => {
    if (speechSynthesis.speaking && readingMessageIndex === index) {
      speechSynthesis.cancel();
      setReadingMessageIndex(null);
    } else {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setReadingMessageIndex(null);
      };
      speechSynthesis.speak(utterance);
      setReadingMessageIndex(index);
    }
  };

  return (
    <div className="ai-feedback-chat-page">
      <div className="chat-container">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'ai' ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
                  <div className="ai-message-actions">
                    <button onClick={() => handleCopy(message.text)}><FaCopy size={16}/></button>
                    <button onClick={() => handleReadAloud(message.text, index)}>
                      {readingMessageIndex === index ? <FaVolumeOff /> : <FaVolumeUp size={16} />}
                    </button>
                  </div>
                </>
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
            name="input"
            className="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Let's chat!"
            rows={1}
          />
          <button type="submit" className="send-button" disabled={!input.trim() || isLoading}>
            <FaArrowUp size={16} />
          </button>
          <div className="microphone-icon-container" onClick={handleMicClick}>
            {isListening ? <FaMicrophoneSlash size={16} /> : <FaMicrophone size={16} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIFeedbackPage;