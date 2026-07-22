// server/server.js
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { Parser } from "json2csv";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://silenth-test.netlify.app",
            "https://silenth.pages.dev",
            "https://silenthdeploy.pages.dev",
            "https://www.silenthnyc.com",
            "https://silenthnyc.com"
        ],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());

// Ensure /data folder still exists (not used anymore, but safe to keep for logs or exports)
const dataDir = path.resolve("./data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("📁 Created data directory");
}

const isLocal = process.env.NODE_ENV !== "production";

// Initialize PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocal ? false : { rejectUnauthorized: false },
});

// Ensure table exists on startup
(async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        date_added TIMESTAMP DEFAULT NOW()
      );
    `);
        console.log("✅ PostgreSQL table check complete.");
    } catch (err) {
        console.error("❌ Failed to initialize PostgreSQL:", err);
    }
})();

// 📨 Subscription endpoint
app.post("/api/subscribe", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email)
        return res.status(400).json({ error: "Missing fields" });

    try {
        await pool.query(
            `INSERT INTO subscribers (name, email)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING;`,
            [name, email]
        );
        res.json({ status: "success" });
    } catch (err) {
        console.error("❌ Database insert error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// 📤 Export all subscribers as CSV
app.get("/api/export", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, date_added FROM subscribers ORDER BY id DESC;"
        );
        const rows = result.rows;

        if (!rows.length) return res.status(200).send("No subscribers yet.");

        const parser = new Parser({
            fields: ["id", "name", "email", "date_added"],
        });
        const csv = parser.parse(rows);

        res.header("Content-Type", "text/csv");
        res.attachment("mailing_list_export.csv");
        res.send(csv);
    } catch (err) {
        console.error("❌ Export failed:", err);
        res.status(500).json({ error: "Failed to export mailing list." });
    }
});

//  Debug route
app.get("/api/debug", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, date_added FROM subscribers ORDER BY id DESC;"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Debug failed:", err);
        res.status(500).json({ error: "Debug failed" });
    }
});

//  EmailJS sanity check (no change)
const PORT = process.env.PORT || 5050;
console.log("🧩 EMAILJS vars check:", {
    SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY ? "✅ loaded" : "❌ missing",
});

app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
