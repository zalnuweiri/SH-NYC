// server/oldserver.js
// DEPRECATED CODE NO LONGER IN USE. KEPT IN CASE A FUTURE DEVELOPER WOULD LOOK TO RUN A CONCURRENT LOCAL/TEST PROCESS
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";
import { Parser } from "json2csv";

const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://silenth-test.netlify.app",
            "https://silenth.pages.dev",
        ],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());

// Ensure data folder exists
const dataDir = path.resolve("./data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("📁 Created data directory");
}

// Initialize SQLite
let db;
(async () => {
    db = await open({
        filename: "./data/mailing_list.db",
        driver: sqlite3.Database,
    });
    await db.exec(
        "CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, date_added TEXT)"
    );
})();

// Subscription endpoint
app.post("/api/subscribe", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email)
        return res.status(400).json({ error: "Missing fields" });

    try {
        // 1️⃣ Insert into DB
        await db.run(
            "INSERT OR IGNORE INTO subscribers (name, email, date_added) VALUES (?, ?, datetime('now'))",
            [name, email]
        );
        res.json({ status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


// Export all subscribers as CSV
app.get("/api/export", async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM subscribers ORDER BY id DESC");

        if (!rows.length) {
            return res.status(200).send("No subscribers yet.");
        }

        const parser = new Parser({
            fields: ["id", "name", "email", "date_added"],
        });
        const csv = parser.parse(rows);

        res.header("Content-Type", "text/csv");
        res.attachment("mailing_list_export.csv");
        res.send(csv);
    } catch (err) {
        console.error("Export failed:", err);
        res.status(500).json({ error: "Failed to export mailing list." });
    }
});

// Debug route
app.get("/api/debug", async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM subscribers ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "debug failed" });
    }
});

const PORT = process.env.PORT || 5050;
console.log("🧩 EMAILJS vars check:", {
    SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY ? "✅ loaded" : "❌ missing",
});

app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
