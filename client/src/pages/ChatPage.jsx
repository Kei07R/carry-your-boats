import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { sendMessage } from "../api/funtions";
import botImg from "../assets/bot.png";
import usrImg from "../assets/user.png";

export default function ChatPage() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "assistant",
      text: "What’s up, man. I’m David. How you doing? You staying hard?",
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    setIsSending(true);

    const userMsg = { sender: "user", text: userMessage };
    setChatHistory((prev) => [...prev, userMsg]);
    setUserMessage("");

    try {
      const reply = await sendMessage(userMessage);
      setChatHistory((prev) => [...prev, { sender: "assistant", text: reply }]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: "Sorry, I couldn’t reach the server." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-background via-brand-background to-white/70 px-2 sm:px-4 py-4">
      <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-brand-secondary/20 overflow-hidden">
        {/* Header */}
        <header className="bg-white/70 border-b border-brand-secondary/20 px-4 py-3 flex items-center justify-between shadow-sm">
          <Link
            to="/"
            className="flex items-center gap-2 text-brand-neutral hover:text-brand-primary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-[2px] rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary">
              <img
                src={botImg}
                alt="Bot"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md"
              />
            </div>
          </div>
        </header>

        {/* Scrollable chat history */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-b from-white/90 to-white/60 scroll-smooth"
        >
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end mb-5 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "assistant" && (
                <img
                  src={botImg}
                  alt="Bot"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full mr-3 border border-brand-secondary/20 shadow-sm"
                />
              )}
              <div
                className={`px-4 py-3 sm:px-5 sm:py-3 rounded-2xl max-w-[75%] sm:max-w-[70%] leading-relaxed font-sans text-sm sm:text-base break-words ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md"
                    : "bg-white text-brand-neutral border border-brand-secondary/10 shadow-sm"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <img
                  src={usrImg}
                  alt="You"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ml-3 border border-brand-primary/30 shadow-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="border-t border-brand-secondary/20 bg-white/80 backdrop-blur-sm px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <input
              type="text"
              className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all text-sm sm:text-base bg-white/90"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !isSending && handleSendMessage()
              }
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-brand-secondary text-white font-medium rounded-xl hover:bg-brand-primary transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
