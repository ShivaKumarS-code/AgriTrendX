import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

// Middleware
app.use(express.json()); // To parse JSON request bodies


// Routes
app.get("/", (req, res) => {
  res.send("Argi API");
});

export { app };