import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const botAvatar = 'https://res.cloudinary.com/dmgrdgvcf/image/upload/v1754375206/android-chrome-192x192_imxhjz.png';
const userAvatar = 'https://res.cloudinary.com/dmgrdgvcf/image/upload/v1754414426/ByeWind_zglo0c.svg';

type Message = {
      sender: 'user' | 'bot';
      text: string;
};

export default function ChatBot() {
      const [open, setOpen] = useState(false);
      const [input, setInput] = useState('');
      const [messages, setMessages] = useState<Message[]>([]);
      const [botTyping, setBotTyping] = useState(false);
      const socketRef = useRef<Socket | null>(null);
      const chatBodyRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            socketRef.current = io(`http://localhost:3501`);
            socketRef.current.on("bot_reply", (msg: any) => {
                  // msg là string!
                  setMessages(prev => {
                        const next = [...prev, { sender: 'bot', text: msg }];
                        return next;
                  });
                  setBotTyping(false);
            });
            return () => {
                  socketRef.current?.disconnect();
            };
      }, []);


      useEffect(() => {
            if (chatBodyRef.current) {
                  chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
            }
      }, [messages, open, botTyping]);

      const handleSend = () => {
            if (!input.trim()) return;
            setMessages(prev => {
                  const next = [...prev, { sender: 'user', text: input }];
                  return next;
            });
            setBotTyping(true);
            socketRef.current?.emit('user_message', input);
            setInput('');
      };


      return (
            <div className="chat-widget">
                  {!open && (
                        <button className="chat-bubble" onClick={() => setOpen(true)}>
                              <img src={botAvatar} alt="Bot" />
                        </button>
                  )}

                  {open && (
                        <div className="chat-popup">
                              <div className="chat-header">
                                    <span>SonaSpace Bot</span>
                                    <button onClick={() => setOpen(false)}>×</button>
                              </div>
                              <div className="chat-body" ref={chatBodyRef}>
                                    {messages.map((msg, i) => (
                                          <div
                                                key={i}
                                                className={`chat-message ${msg.sender === 'user' ? 'right' : 'left'}`}
                                          >
                                                <img src={msg.sender === 'user' ? userAvatar : botAvatar} alt={msg.sender} />
                                                <span>{msg.text}</span>
                                          </div>
                                    ))}
                                    {botTyping && (
                                          <div className="chat-message left">
                                                <img src={botAvatar} alt="Bot" />
                                                <span className="typing-indicator">
                                                      <span className="dot"></span>
                                                      <span className="dot"></span>
                                                      <span className="dot"></span>
                                                </span>
                                          </div>
                                    )}
                              </div>
                              <div className="chat-input">
                                    <input
                                          value={input}
                                          onChange={e => setInput(e.target.value)}
                                          placeholder="Nhập tin nhắn..."
                                          onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    />
                                    <button onClick={handleSend}>Gửi</button>
                              </div>
                        </div>
                  )}
            </div>
      );
}
