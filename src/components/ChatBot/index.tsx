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
            // Kết nối với Gemini namespace
            socketRef.current = io(`http://localhost:3501/gemini`);
            
            // Lắng nghe phản hồi từ Gemini
            socketRef.current.on("bot_response", (data: { response: string }) => {
                  // Thêm phản hồi từ Gemini bot
                  setMessages(prev => [...prev, {
                        sender: 'bot',
                        text: data.response,
                        type: 'text'
                  } as Message]);
                  setBotTyping(false);
            });

            // Lắng nghe lỗi từ Gemini
            socketRef.current.on("error_response", (data: { error: string }) => {
                  setMessages(prev => [...prev, {
                        sender: 'bot',
                        text: `❌ ${data.error}`,
                        type: 'text'
                  } as Message]);
                  setBotTyping(false);
            });

            // Test connection với Gemini
            socketRef.current.on("test_response", (data: { message: string }) => {
                  setMessages(prev => [...prev, {
                        sender: 'bot',
                        text: data.message,
                        type: 'text'
                  } as Message]);
                  setBotTyping(false);
            });

            socketRef.current.on("connect_error", () => {
                  setMessages(prev => [...prev, { 
                        sender: 'bot', 
                        text: "❌ Không kết nối được máy chủ Gemini chat.", 
                        type: 'text' 
                  }]);
                  setBotTyping(false);
            });

            socketRef.current.on("connect", () => {
                  console.log("✅ Đã kết nối với Gemini server");
                  // Test connection khi kết nối thành công
                  socketRef.current?.emit("test_connection", { client: "React ChatBot" });
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
            const hasText = !!input.trim();
            const hasImage = !!selectedImage;

            if (!hasText && !hasImage) return;

            // Trường hợp CÓ ẢNH (kèm hoặc không kèm text):
            if (hasImage) {
                  const file = selectedImage!;
                  const reader = new FileReader();

                  reader.onload = (e) => {
                        const imageData = e.target?.result as string;

                        // Hiển thị tin nhắn người dùng (ảnh + caption nếu có)
                        setMessages(prev => [
                              ...prev,
                              {
                                    sender: 'user',
                                    text: hasText ? input.trim() : file.name, // caption nếu có, không thì show file name
                                    image: imageData,
                                    type: 'image',
                              } as Message,
                        ]);

                        // Gửi ảnh cho Gemini server
                        socketRef.current?.emit('user_image', {
                              data: imageData,                               // data:image/png;base64,....
                              prompt: hasText ? input.trim() : 'Hãy mô tả nội dung hình ảnh chi tiết.'
                        });

                        setBotTyping(true);
                        setInput('');
                        setSelectedImage(null);
                        setImagePreview(null);
                  };

                  reader.readAsDataURL(file);
                  return; // tránh rơi xuống gửi user_message nữa
            }

            // Trường hợp CHỈ TEXT:
            if (hasText) {
                  const text = input.trim();

                  setMessages(prev => [
                        ...prev,
                        { sender: 'user', text, type: 'text' } as Message,
                  ]);

                  // Gửi tin nhắn text cho Gemini server
                  socketRef.current?.emit('user_message', { message: text });

                  setBotTyping(true);
                  setInput('');
            }
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
                                    <span>SonaSpace Bot {minimized ? '' : ''}</span>
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
