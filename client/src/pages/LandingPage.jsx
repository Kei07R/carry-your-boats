import React from "react";
import landingPageImg from "../assets/homeImg.png";

export default function LandingPage() {
  return (
    <div>
      <div>
        <img
          className="w-[200px]"
          src={landingPageImg}
          alt="Landing Page Img"
        />
      </div>
      <div>
        <h1 className="text-h1 font-sans text-brand-secondary">
          Carry Your Boats
        </h1>
        <p className="text-body font-sans text-brand-neutral max-w-md">
          An AI-Powered Platform to bring you brack to your hard self.
        </p>
      </div>

      <div className="bg-brand-primary text-white p-4">
        Tailwind 3 brand color working 🎉
      </div>
    </div>
  );
}
