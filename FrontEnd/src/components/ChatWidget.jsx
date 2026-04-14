import { useState, useEffect, useRef } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '../context/AuthContext';
import chatApi from '../api/chatApi';

const ChatWidget = () => {
    const { isAuthenticated, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversation, setConversation] = useState(null);
    const messagesEndRef = useRef(null);
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated && user?.role === 'USER') {
            fetchConversation();
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (isOpen && conversation) {
            fetchMessages();

            const client = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
                debug: function (str) {
                    console.log(str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            client.onConnect = function (frame) {
                console.log('Connected to WebSocket!');
                // Subscribe to conversation updates
                client.subscribe('/topic/conversations/' + conversation.id, (message) => {
                    const newMsg = JSON.parse(message.body);
                    setMessages(prev => {
                        // Prevent duplicate messages if added via API response
                        if (prev.some(m => m.id === newMsg.id)) return prev;
                        return [...prev, newMsg];
                    });
                });
            };

            client.onStompError = function (frame) {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            };

            client.activate();
            stompClientRef.current = client;

            return () => {
                if (stompClientRef.current) {
                    stompClientRef.current.deactivate();
                }
            };
        }
    }, [isOpen, conversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversation = async () => {
        try {
            const res = await chatApi.getConversations();
            if (res && res.length > 0) {
                setConversation(res[0]);
            }
        } catch (error) {
            console.error('Error fetching conversation', error);
        }
    };

    const fetchMessages = async () => {
        if (!conversation) return;
        try {
            const res = await chatApi.getMessages(conversation.id);
            setMessages(res || []);
        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            // First time send, create conversation
            if (!conversation) {
                const res = await chatApi.sendMessage({
                    conversationId: null,
                    content: newMessage,
                });
                setMessages(prev => [...prev, res]);
                fetchConversation(); // Re-fetch to get newly created conversation and initialize WebSocket
            } else {
                // Always send via REST API to ensure JWT token is validated and Spring Security Context is populated
                const res = await chatApi.sendMessage({
                    conversationId: conversation.id,
                    content: newMessage,
                });
                
                // If the backend resolved to a different conversation ID (e.g. due to DB reset), update local state
                if (res.conversationId !== conversation.id) {
                    fetchConversation();
                }

                // Add to local state immediately for snappy UI (subscriber will ignore duplicate)
                setMessages(prev => {
                    if (prev.some(m => m.id === res.id)) return prev;
                    return [...prev, res];
                });
            }
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    if (!isAuthenticated || user?.role !== 'USER') return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            <div 
                className={`transition-all duration-300 ease-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-95 opacity-0 pointer-events-none mb-0 h-0 w-0'}`}
            >
                <div className="w-[340px] h-[520px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col overflow-hidden border border-slate-100">
                    {/* Premium Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex justify-between items-center shadow-md relative z-10">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm shadow-inner">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-semibold text-white tracking-wide text-sm block">Shop Support</span>
                                <span className="text-violet-200 text-xs flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 border border-emerald-200 animate-pulse"></span>
                                    Online Default
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-all"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50/60 space-y-4 scroll-smooth">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-80">
                                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-indigo-50 rounded-full flex items-center justify-center mb-4 shadow-sm border border-violet-100/50">
                                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-violet-500" />
                                </div>
                                <p className="text-slate-600 font-semibold text-sm">Welcome to TechShop!</p>
                                <p className="text-slate-400 text-xs mt-1.5 max-w-[200px]">We generally reply in a few minutes. How can we help you?</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => {
                                const isMine = msg.senderId === user.id;
                                return (
                                    <div key={index} className={`flex ${isMine ? 'justify-end' : 'justify-start'} transition-all duration-300`}>
                                        <div
                                            className={`max-w-[75%] px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                                                isMine 
                                                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl rounded-br-sm' 
                                                : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm'
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 relative">
                        <div className="relative flex items-center shadow-sm rounded-full bg-slate-50 border border-slate-200 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100 transition-all">
                            <input
                                type="text"
                                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-slate-700 placeholder-slate-400"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="mr-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-2 rounded-full hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <PaperAirplaneIcon className="w-4 h-4 transform -rotate-45 ml-0.5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Floating button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center p-4 rounded-full shadow-[0_8px_20px_rgba(99,102,241,0.4)] transition-all duration-500 transform ${
                    isOpen 
                    ? 'rotate-90 scale-0 opacity-0 absolute' 
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(99,102,241,0.6)] rotate-0 scale-100 opacity-100 hover:-translate-y-1 z-50'
                }`}
            >
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
            </button>
        </div>
    );
};

export default ChatWidget;
