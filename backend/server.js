const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Set up upload folder
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") return cb(new Error("Only PDFs allowed"));
    cb(null, true);
}});

// SQLite setup
const db = new sqlite3.Database("./db.sqlite");
db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    filepath TEXT,
    filesize INTEGER,
    created_at TEXT
)`);

// Routes
app.post("/documents/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const stmt = db.prepare("INSERT INTO documents (filename, filepath, filesize, created_at) VALUES (?, ?, ?, ?)");
  stmt.run(req.file.originalname, req.file.path, req.file.size, new Date().toISOString());
  stmt.finalize();

  res.json({ success: true, message: "File uploaded successfully" });
});

app.get("/documents", (req, res) => {
  db.all("SELECT * FROM documents ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.get("/documents/:id", (req, res) => {
  db.get("SELECT * FROM documents WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).send("File not found");
    res.download(row.filepath, row.filename);
  });
});

app.delete("/documents/:id", (req, res) => {
  db.get("SELECT * FROM documents WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ message: "File not found" });
    fs.unlinkSync(row.filepath);
    db.run("DELETE FROM documents WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "File deleted successfully" });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

