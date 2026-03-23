'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import axios from '@/lib/axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function for tailwind classes (same as in other components)
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hello! I am your AI Study Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await axios.post('/ai/chat', { message: userMessage });
            setMessages(prev => [...prev, { role: 'ai', content: res.data.response }]);
        } catch (error) {
            console.error('AI Chat Error:', error);
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[16px] leading-tight">Study Assistant</h3>
                                <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">AI Powered</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                    "flex w-full",
                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[80%] p-4 rounded-2xl text-[14px] leading-relaxed",
                                    msg.role === 'user' 
                                        ? "bg-gray-900 text-white rounded-tr-none shadow-md" 
                                        : "bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    <span className="text-[13px] text-gray-400 font-medium">Assistant is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="relative flex items-center">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask your study assistant..."
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                            AI can make mistakes. Verify important info.
                        </p>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-500 hover:scale-110",
                    isOpen ? "bg-white text-gray-900 rotate-90" : "bg-gray-900 text-white rotate-0"
                )}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <div className="relative">
                        <MessageSquare className="w-7 h-7" />
                        <Sparkles className="w-4 h-4 text-primary absolute -top-2 -right-2 animate-pulse" />
                    </div>
                )}
            </button>
        </div>
    );
}
