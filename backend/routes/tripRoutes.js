const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { source, destination, distance } = req.body;

  const result = await pool.query(
    "INSERT INTO trips (user_id, source, destination, distance) VALUES ($1, $2, $3, $4) RETURNING *",
    [req.userId, source, destination, distance]
  );

  res.json(result.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM trips WHERE user_id = $1",
    [req.userId]
  );

  res.json(result.rows);
});

module.exports = router;