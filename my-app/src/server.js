// Express api and sqlite integration copied and modified from express homework part 2
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5001;
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database("exercises.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database");
});

db.run(`CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  rest INTEGER NOT NULL
)`);

// CRUD Routes
app.get("/exercises", (req, res) => {
  db.all("SELECT * FROM exercises", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.post("/exercises", (req, res) => {
  const { name, description, category, sets, reps, rest } = req.body;
  if (!name || !description || !category || !sets || !reps || !rest) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.run(
    `INSERT INTO exercises (name, description, category, sets, reps, rest) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, category, sets, reps, rest],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, ...req.body });
    }
  );
});

app.put("/exercises/:id", (req, res) => {
  const { name, description, category, sets, reps, rest } = req.body;
  const { id } = req.params;
  db.run(
    `UPDATE exercises SET name=?, description=?, category=?, sets=?, reps=?, rest=? WHERE id=?`,
    [name, description, category, sets, reps, rest, id],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: "Exercise updated successfully" });
    }
  );
});

app.delete("/exercises/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM exercises WHERE id=?`, id, function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Exercise deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
