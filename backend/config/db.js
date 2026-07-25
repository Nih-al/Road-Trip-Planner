const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "roadtrip",
  password: "Nihaal@2112",
  port: 5432,
});

module.exports = pool;