import { useNavigate } from "react-router-dom";
import { PERSONAS } from "../personas";

export default function LandingPage() {
  const navigate = useNavigate();
  const personas = Object.values(PERSONAS);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Hero */}
      <div className="text-center pt-16 pb-10 px-4">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
          AI Mentor Chat
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Carry Your Boats
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-sm mx-auto leading-relaxed">
          Choose a mentor. Have an honest conversation.
        </p>
      </div>

      {/* Persona Grid */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onSelect={() =>
                navigate("/chat", { state: { personaId: persona.id } })
              }
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-gray-600 text-xs tracking-wide">
        Powered by Google Gemini
      </div>
    </div>
  );
}

function PersonaCard({ persona, onSelect }) {
  return (
    <div
      className={`group bg-gray-900 border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer ${persona.borderClass}`}
      onClick={onSelect}
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl ${persona.iconBgClass} flex items-center justify-center text-xl flex-shrink-0`}
      >
        {persona.emoji}
      </div>

      {/* Name + Title */}
      <div>
        <h2 className="text-lg font-bold text-white leading-tight">
          {persona.name}
        </h2>
        <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${persona.accentTextClass}`}>
          {persona.title}
        </p>
      </div>

      {/* Tagline */}
      <p className={`text-sm italic ${persona.accentTextClass} opacity-75`}>
        {persona.tagline}
      </p>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">
        {persona.description}
      </p>

      {/* CTA */}
      <button
        className={`w-full mt-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${persona.btnClass}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        Begin Session
      </button>
    </div>
  );
}
