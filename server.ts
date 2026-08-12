import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import crypto from "crypto";

const PORT = 3000;

const adjectives = ["Phantom", "Neon", "Cyber", "Quantum", "Holo", "Void", "Astral", "Echo", "Stellar", "Cosmic", "Lunar", "Solar", "Glitch", "Flux", "Nova", "Zero", "Apex", "Mecha", "Synth", "Chroma"];
const animals = ["Wolf", "Fox", "Hawk", "Panther", "Tiger", "Dragon", "Phoenix", "Viper", "Ghost", "Raven", "Owl", "Bear", "Lynx", "Shark", "Mantis", "Kraken", "Griffin", "Sphinx", "Moth", "Stag"];

function generateNameFromIP(ip: string): string {
  const hash = crypto.createHash("md5").update(ip || "unknown").digest("hex");
  const adjIndex = parseInt(hash.substring(0, 4), 16) % adjectives.length;
  const aniIndex = parseInt(hash.substring(4, 8), 16) % animals.length;
  const num = parseInt(hash.substring(8, 12), 16) % 1000;
  return `${adjectives[adjIndex]} ${animals[aniIndex]} ${num}`;
}

function generateColorFromIP(ip: string): string {
  const hash = crypto.createHash("md5").update(ip || "unknown").digest("hex");
  // Generate a nice vibrant HSL color for dark mode (high saturation/lightness)
  const hue = parseInt(hash.substring(12, 16), 16) % 360;
  return `hsl(${hue}, 80%, 65%)`;
}

type ChatMessage = {
  id: string;
  senderName: string;
  senderColor: string;
  content: string;
  timestamp: number;
};

// In-memory chat history
const chatHistory: ChatMessage[] = [];
const MAX_HISTORY = 100;

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  io.on("connection", (socket) => {
    // Determine user IP (checking standard proxy headers first)
    const ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address || "unknown-ip";
    const ipString = Array.isArray(ip) ? ip[0] : ip;
    
    const senderName = generateNameFromIP(ipString);
    const senderColor = generateColorFromIP(ipString);

    // Send the user their generated profile and current history
    socket.emit("init", {
      profile: { name: senderName, color: senderColor },
      history: chatHistory
    });

    socket.on("send_message", (content: string) => {
      if (!content || typeof content !== "string" || content.trim().length === 0) return;
      
      const msg: ChatMessage = {
        id: crypto.randomUUID(),
        senderName,
        senderColor,
        content: content.trim().substring(0, 500), // Max length
        timestamp: Date.now()
      };

      chatHistory.push(msg);
      if (chatHistory.length > MAX_HISTORY) {
        chatHistory.shift();
      }

      // Broadcast to everyone including sender
      io.emit("new_message", msg);
    });
  });

  // API Route for health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
