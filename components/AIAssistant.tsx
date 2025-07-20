import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface AIAssistantProps {
  messages: AIMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ messages, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <SparklesIcon className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />}
            <div
              className={`max-w-md rounded-lg px-4 py-2 text-sm ${
                msg.sender === 'user'
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1]?.sender === 'user' && (
           <div className="flex gap-3">
              <SparklesIcon className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
              <div className="bg-slate-700 text-slate-300 rounded-lg px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-slate-700 bg-slate-800">
        <div className="flex items-center bg-slate-700 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI for help..."
            className="w-full bg-transparent p-2 text-sm text-slate-200 resize-none focus:outline-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg m-1 hover:bg-violet-500 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;