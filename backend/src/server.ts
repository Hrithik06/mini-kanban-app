import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 7777;
app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Adds headers: Access-Control-Allow-Origin: http://example.com, Vary: Origin

app.use("/", router);
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
