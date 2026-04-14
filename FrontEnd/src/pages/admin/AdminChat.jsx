import { useState, useEffect, useRef } from 'react';
import chatApi from '../../api/chatApi';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const AdminChat = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const { user } = useAuth();
    const stompClientRef = useRef(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        // Connect generic web socket for Admin
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
            console.log('Connected to WebSocket (Admin)!');
            client.subscribe('/topic/admin/conversations', (message) => {
               // When any new message is sent, refresh conversations list
               fetchConversations();
            });
        };

        client.activate();
        stompClientRef.current = client;

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    useEffect(() => {
        if (selectedConv) {
            fetchMessages(selectedConv.id);
            // We can also subscribe specifically to the selected conversation 
            // inside the existing stomp connection, but it's simpler to just reuse the client.
            
            // To ensure we don't have multiple subscriptions to the same topic:
            if(stompClientRef.current && stompClientRef.current.connected) {
                 const subscription = stompClientRef.current.subscribe('/topic/conversations/' + selectedConv.id, (message) => {
                     const newMsg = JSON.parse(message.body);
                     setMessages(prev => {
                         if (prev.some(m => m.id === newMsg.id)) return prev;
                         return [...prev, newMsg];
                     });
                 });
                 return () => {
                     subscription.unsubscribe();
                 };
            }
        }
    }, [selectedConv]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const res = await chatApi.getConversations();
            setConversations(res || []);
        } catch (error) {
            console.error('Error fetching conversations', error);
        }
    };

    const fetchMessages = async (convId) => {
        try {
            const res = await chatApi.getMessages(convId);
            setMessages(res || []);
        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConv) return;

        try {
            // Always force sending over REST API for Spring Security context hydration
            const res = await chatApi.sendMessage({
                conversationId: selectedConv.id,
                content: newMessage,
            });
            setMessages(prev => {
                if (prev.some(m => m.id === res.id)) return prev;
                return [...prev, res];
            });
            fetchConversations(); // refresh list for last message update
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div className="flex h-[80vh] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-800">Danh sách Chat</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <p className="text-slate-500 text-center py-8">Chưa có tin nhắn nào.</p>
                    ) : (
                        conversations.map(conv => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConv(conv)}
                                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors ${selectedConv?.id === conv.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-slate-800">{conv.userEmail || `User #${conv.userId}`}</span>
                                    <span className="text-xs text-slate-400">
                                        {conv.lastMessageAt ? new Date(conv.lastMessageAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 truncate">
                                    {conv.userName || 'Unknown User'}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col">
                {selectedConv ? (
                    <>
                        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col">
                            <span className="font-bold text-slate-800">{selectedConv.userEmail || `User #${selectedConv.userId}`}</span>
                            <span className="text-xs text-slate-500">{selectedConv.userName}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
                            {messages.map((msg, idx) => {
                                const isMine = msg.senderId === user.id;
                                return (
                                    <div key={idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[70%] p-3 rounded-2xl text-sm ${isMine ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400">
                        Chọn một cuộc trò chuyện để bắt đầu
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
