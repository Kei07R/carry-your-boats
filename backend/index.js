const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chatRoutes = require("./routes/chat.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/", chatRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Carry Your Boats API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});