import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendMessage } from "../api/funtions";
import { PERSONAS } from "../personas";
import botImg from "../assets/bot.png";
import usrImg from "../assets/user.png";

export default function ChatPage() {
  const location = useLocation();
  const personaId = location.state?.personaId || "goggins";
  const persona = PERSONAS[personaId] || PERSONAS.goggins;

  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: persona.greeting },
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
    if (!userMessage.trim() || isSending) return;
    setIsSending(true);

    const userMsg = { role: "user", content: userMessage };
    setChatHistory((prev) => [...prev, userMsg]);
    setUserMessage("");

    try {
      const reply = await sendMessage(userMessage, chatHistory, personaId);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't reach the server." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-2 sm:px-4 py-4">
      <div className="w-full max-w-3xl h-[90vh] flex flex-col bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">

        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Mentors</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white font-semibold text-sm leading-tight">{persona.name}</p>
              <p className={`text-xs font-medium ${persona.accentTextClass}`}>{persona.title}</p>
            </div>
            <div className={`w-9 h-9 rounded-xl ${persona.iconBgClass} flex items-center justify-center text-lg border border-gray-700`}>
              {persona.emoji}
            </div>
          </div>
        </header>

        {/* Thin accent line */}
        <div className={`h-px bg-gradient-to-r ${persona.headerAccent} opacity-60 flex-shrink-0`} />

        {/* Chat history */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-gray-950 [scrollbar-width:none]"
        >
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <img
                  src={botImg}
                  alt={persona.name}
                  className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0 mb-0.5"
                />
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] sm:max-w-[70%] leading-relaxed text-sm sm:text-base break-words ${
                  msg.role === "user"
                    ? `bg-gradient-to-r ${persona.bubbleClass} text-white shadow-md rounded-br-sm`
                    : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <img
                  src={usrImg}
                  alt="You"
                  className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0 mb-0.5"
                />
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex items-end gap-2.5 justify-start">
              <img src={botImg} alt={persona.name} className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0 mb-0.5" />
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-800 border border-gray-700">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t border-gray-800 bg-gray-900 px-3 sm:px-5 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm transition-all"
              placeholder={`Message ${persona.name}...`}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${persona.btnClass}`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
