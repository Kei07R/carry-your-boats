# Carry Your Boats

A persona-based AI chatbot that connects you with iconic mentors when you need motivation, discipline, or wisdom. Choose your guide, start a conversation, and get pushed back on track.

> "Stay Hard!" — David Goggins

---

## Personas

| Persona | Style |
|---|---|
| **David Goggins** | Radical accountability, mental toughness, no excuses |
| **Kobe Bryant** | Mamba Mentality, obsessive work ethic, competitive greatness |
| **Jocko Willink** | Extreme ownership, military discipline, leadership |
| **Marcus Aurelius** | Stoic philosophy, virtue, inner strength |

---

## Tech Stack

- **Frontend**: React 19, Vite, React Router, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: Google Gemini 2.5 Flash (via OpenAI SDK compatibility layer)

---

## Project Structure

```
carry-your-boats/
├── backend/
│   ├── controllers/chatController.js   # Handles AI chat logic
│   ├── routes/chat.routes.js           # POST /api/chat
│   ├── personas.js                     # System prompts for each persona
│   └── index.js                        # Express server (port 5000)
└── client/
    └── src/
        ├── pages/
        │   ├── LandingPage.jsx         # Persona selection
        │   ├── ChatPage.jsx            # Chat interface
        │   └── NotFound.jsx
        ├── api/funtions.js             # API call to backend
        └── personas.js                 # Persona metadata for UI
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the server:

```bash
npm run dev
```

Runs on `http://localhost:5000`.

### 2. Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`. Vite automatically proxies `/api/*` requests to the backend.

---

## How It Works

1. User selects a persona on the landing page.
2. A chat session starts with that persona's system prompt injected into the Gemini API call.
3. The full chat history is sent with each request to maintain conversation context.
4. The AI responds in character.

---

## License

[MIT](LICENSE)
