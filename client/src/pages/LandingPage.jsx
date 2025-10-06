import React from "react";
import landingPageImg from "../assets/homeImg.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-brand-primary via-brand-background to-brand-secondary">
      <img
        src={landingPageImg}
        alt="Landing"
        className="w-48 h-48 object-contain mb-gapMd rounded-lg shadow-lg"
      />
      <h1 className="text-brand-primary text-h1 font-sans mb-gapSm text-center">
        Welcome to Carry Your Boats
      </h1>
      <p className="text-brand-neutral text-body font-sans mb-gapMd text-center max-w-xl">
        <span className="block mt-2 text-brand-neutral opacity-80">
          Unlock your potential and stay motivated every day.
          <br />
          "STAY HARD!"
        </span>
      </p>
      <Link to="/chat">
        <button className="bg-brand-secondary text-white px-btnX py-btnY rounded-lg text-body font-sans hover:bg-brand-primary transition">
          Start Chatting
        </button>
      </Link>
    </div>
  );
}
