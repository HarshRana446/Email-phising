require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const checkRoutes = require("./routes/check");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

app.use("/api/auth", authRoutes);
app.use("/api/check", checkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("Loaded Gemini API Key:", process.env.GEMINI_API_KEY);
