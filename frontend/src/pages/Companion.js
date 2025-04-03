import { useState } from "react";
import { Card, Button } from "@radix-ui/themes";
import UserImage from "../assets/user.png";
import RobotImage from "../assets/robot.png";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) {
        return;
    }

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    //set back message to empty
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "Hi!" }]);
    }, 500);
  };

  return (
    <div className="chat-container">
      <Card className="chat-box">
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
                <img src={avatar} alt={msg.sender} className={`avatar ${avatarClass}`} />
                <div className={`message ${messageClass}`}>{msg.text}</div>
              </div>
            );
          })}
        </div>
        <div className="input-container">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
          />
          <Button onClick={sendMessage} className="send-button">
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
}

