const express = require("express");
const connectDB = require("./config/db");
// const path = require("path");

const app = express();

connectDB();

// bodyparser
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("API running"));

// define routes
app.use("/login", require("./routes/login"));
app.use("/schedule", require("./routes/schedule"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
