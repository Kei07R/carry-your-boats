import React from "react";
import landingPageImg from "../assets/homeImg.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-brand-background via-brand-background to-white/50">
      <div className="w-full max-w-4xl p-12 flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-brand-secondary/20">
        <img
          src={landingPageImg}
          alt="Landing"
          className="w-48 h-48 object-contain mb-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-h1 font-sans mb-6 text-center bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          Welcome to Carry Your Boats
        </h1>
        <p className="text-brand-neutral text-body font-sans mb-8 text-center max-w-xl">
          <span className="block text-lg leading-relaxed">
            An AI-powered chatbot with David Goggins Personlity.
            <br />
            <span className="font-semibold text-brand-secondary">
              "STAY HARD!"
            </span>
          </span>
        </p>
        <Link to="/chat" className="w-full max-w-md">
          <button className="w-full bg-brand-secondary text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Start Chatting
          </button>
        </Link>
      </div>
    </div>
  );
}
