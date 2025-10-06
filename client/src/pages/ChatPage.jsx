import React, { useState } from "react";
import { sendMessage } from "../api/funtions";
import botImg from "../assets/bot.png";
import usrImg from "../assets/user.png";

export default function ChatPage() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    setIsSending(true);
    const userMsgObj = { sender: "user", text: userMessage };
    setChatHistory((prev) => [...prev, userMsgObj]);
    const reply = await sendMessage(userMessage);
    setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    setUserMessage("");
    setIsSending(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-brand-background">
      <div className="flex-1 flex flex-col justify-end items-center w-full">
        <div
          className="w-full max-w-2xl flex-1 flex flex-col justify-end py-8 px-2 sm:px-6 md:px-8 overflow-y-auto"
          style={{ height: "100vh" }}
        >
          {chatHistory.length === 0 && (
            <div className="text-center text-brand-neutral opacity-60 mt-8">
              Start chatting with the bot!
            </div>
          )}
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src={botImg}
                  alt="Bot"
                  className="w-10 h-10 rounded-full mr-3 border-2 border-brand-secondary shadow"
                />
              )}
              <div
                className={`max-w-lg px-5 py-3 rounded-2xl font-sans text-body shadow-lg ${
                  msg.sender === "user"
                    ? "bg-brand-primary text-white"
                    : "bg-white text-brand-neutral border border-brand-secondary"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <img
                  src={usrImg}
                  alt="You"
                  className="w-10 h-10 rounded-full ml-3 border-2 border-brand-primary shadow"
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl px-2 sm:px-6 md:px-8 py-4 flex items-center gap-3 bg-transparent">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-2xl border border-brand-secondary focus:outline-none font-sans text-body bg-white shadow-sm"
            placeholder="Type a message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isSending}
          />
          <button
            className="bg-brand-secondary text-white px-btnX py-btnY rounded-2xl text-body font-sans hover:bg-brand-primary transition shadow-sm"
            onClick={handleSendMessage}
            disabled={isSending}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
