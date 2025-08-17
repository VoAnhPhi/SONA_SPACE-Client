import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import './ChatBot.scss';

const botAvatar = 'https://res.cloudinary.com/dmgrdgvcf/image/upload/v1754375206/android-chrome-192x192_imxhjz.png';
const userAvatar = 'https://res.cloudinary.com/dmgrdgvcf/image/upload/v1754414426/ByeWind_zglo0c.svg';

type Message = {
      sender: 'user' | 'bot';
      text: string;
      image?: string;  // Thêm field cho hình ảnh
      type?: 'text' | 'image';  // Loại tin nhắn
};

export default function ChatBot() {
      const [open, setOpen] = useState(false);
      const [minimized, setMinimized] = useState(false);
      const [input, setInput] = useState('');
      const [messages, setMessages] = useState<Message[]>([]);
      const [botTyping, setBotTyping] = useState(false);
      const [selectedImage, setSelectedImage] = useState<File | null>(null);
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const socketRef = useRef<Socket | null>(null);
      const chatBodyRef = useRef<HTMLDivElement>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
            socketRef.current = io(`http://localhost:3501`);
            socketRef.current.on("bot_reply", (botMessage: string) => {
                  // Thêm phản hồi từ bot
                  setMessages(prev => [...prev, { 
                        sender: 'bot', 
                        text: botMessage, 
                        type: 'text' 
                  } as Message]);
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
            if (!input.trim() && !selectedImage) return;
            
            // Gửi tin nhắn text
            if (input.trim()) {
                  setMessages(prev => [...prev, { 
                        sender: 'user', 
                        text: input, 
                        type: 'text' 
                  } as Message]);
                  socketRef.current?.emit('user_message', input);
            }
            
            // Gửi hình ảnh
            if (selectedImage) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                        const imageData = e.target?.result as string;
                        setMessages(prev => [...prev, { 
                              sender: 'user', 
                              text: selectedImage.name, 
                              image: imageData,
                              type: 'image' 
                        } as Message]);
                        
                        // Gửi hình ảnh qua socket (có thể cần convert base64)
                        socketRef.current?.emit('user_image', {
                              filename: selectedImage.name,
                              data: imageData
                        });
                  };
                  reader.readAsDataURL(selectedImage);
            }
            
            setBotTyping(true);
            setInput('');
            setSelectedImage(null);
            setImagePreview(null);
      };

      const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file && file.type.startsWith('image/')) {
                  setSelectedImage(file);
                  const reader = new FileReader();
                  reader.onload = (event) => {
                        setImagePreview(event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
            }
      };

      const removeImage = () => {
            setSelectedImage(null);
            setImagePreview(null);
            if (fileInputRef.current) {
                  fileInputRef.current.value = '';
            }
      };


      return (
            <div className="chat-widget">
                  {!open && (
                        <button className="chat-bubble" onClick={() => setOpen(true)}>
                              <img src={botAvatar} alt="Bot" />
                        </button>
                  )}

                  {open && (
                        <div 
                              className={`chat-popup ${minimized ? 'minimized' : ''}`}
                              style={minimized ? { height: '60px', overflow: 'hidden' } : {}}
                        >
                              <div 
                                    className="chat-header"
                                    onClick={minimized ? () => setMinimized(false) : undefined}
                                    style={minimized ? { cursor: 'pointer' } : {}}
                                    title={minimized ? "Click để mở rộng" : ""}
                              >
                                    <span>SonaSpace Bot {minimized ? '(Click để mở rộng)' : ''}</span>
                                    <div className="header-buttons">
                                          <button 
                                                onClick={(e) => {
                                                      e.stopPropagation(); // Ngăn event bubbling
                                                      console.log('Minimize clicked, current minimized:', minimized);
                                                      setMinimized(!minimized);
                                                }}
                                                title={minimized ? "Mở rộng" : "Thu nhỏ"}
                                                className="minimize-btn"
                                          >
                                                {minimized ? 
                                                      <i className="fa-solid fa-window-maximize"></i> : 
                                                      <i className="fa-solid fa-window-minimize"></i>
                                                }
                                          </button>
                                          <button 
                                                onClick={(e) => {
                                                      e.stopPropagation(); // Ngăn event bubbling
                                                      setOpen(false);
                                                }}
                                                title="Đóng"
                                                className="close-btn"
                                          >
                                                ×
                                          </button>
                                    </div>
                              </div>
                              {!minimized && (
                                    <>
                                          <div className="chat-body" ref={chatBodyRef}>
                                    {messages.map((msg, i) => (
                                          <div
                                                key={i}
                                                className={`chat-message ${msg.sender === 'user' ? 'right' : 'left'}`}
                                          >
                                                <img src={msg.sender === 'user' ? userAvatar : botAvatar} alt={msg.sender} />
                                                <div className="message-content">
                                                      {msg.type === 'image' && msg.image ? (
                                                            <div className="image-message">
                                                                  <img src={msg.image} alt={msg.text} className="chat-image" />
                                                                  <span className="image-filename">{msg.text}</span>
                                                            </div>
                                                      ) : (
                                                            <span>{msg.text}</span>
                                                      )}
                                                </div>
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
                                    {imagePreview && (
                                          <div className="image-preview">
                                                <img src={imagePreview} alt="Preview" />
                                                <button type="button" onClick={removeImage} className="remove-image">×</button>
                                          </div>
                                    )}
                                    <div className="input-container">
                                          <input
                                                value={input}
                                                onChange={e => setInput(e.target.value)}
                                                placeholder="Nhập tin nhắn..."
                                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                          />
                                          <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                style={{ display: 'none' }}
                                          />
                                          <button 
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="image-btn"
                                                title="Đính kèm hình ảnh"
                                          >
                                                <i className="fa-solid fa-paperclip"></i>
                                          </button>
                                          <button onClick={handleSend}>Gửi</button>
                                    </div>
                              </div>
                                    </>
                              )}
                        </div>
                  )}
            </div>
      );
}
