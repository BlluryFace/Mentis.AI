import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "@radix-ui/themes";
import UserImage from "../assets/user.png";
import RobotImage from "../assets/robot.png";
import { Scrollbars } from "react-custom-scrollbars-2";
import SendImage from "../assets/send.png";
import "../styles/styles.css";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi", time: new Date() }
    ]);
    const [input, setInput] = useState("");

    // Reference for the scrollbars component
    const scrollbarsRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim()) {
            return;
        }

        const userMessage = { sender: "user", text: input, time: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        // Bot replies after 0.5s
        setTimeout(() => {
            const botMessage = { sender: "bot", text: "Hi!", time: new Date() };
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    // Automatically scroll to bottom when messages change
    useEffect(() => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollToBottom();
        }
    }, [messages]); // Run this effect whenever the messages array changes

    return (
        <div className="chat-container">
            <Card className="chat-box">
                <Scrollbars className="scrollContainer" ref={scrollbarsRef}>
                    <div className="message-box">
                        {messages.map((msg, index) => {
                            let avatar = "";
                            let messageClass = "";
                            let avatarClass = "";
                            let containerClass = "";

                            if (msg.sender === "user") {
                                avatar = UserImage;
                                messageClass = "user-message";
                                avatarClass = "avatar-user";
                                containerClass = "message-container user-container";
                            } else {
                                avatar = RobotImage;
                                messageClass = "bot-message";
                                avatarClass = "avatar-chatbot";
                                containerClass = "message-container bot-container";
                            }

                            return (
                                <div key={index} className={containerClass}>
                                    <img
                                        src={avatar}
                                        alt={msg.sender}
                                        className={`avatar ${avatarClass}`}
                                    />
                                    <div className={`message ${messageClass}`}>
                                        <div>{msg.text}</div>
                                        <div>
                                            {msg.time.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* No need for this empty div anymore */}
                        {/* <div ref={scrollBottomRef}></div> */}
                    </div>
                </Scrollbars>
                <div className="input-container">
                    <input
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Ask anything"
                    />
                    <Button onClick={sendMessage} className="send-button">
                        <img src={SendImage} alt="SendImage Icon" className="send-image" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}