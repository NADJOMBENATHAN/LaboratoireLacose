const { Pool } = require("pg");
require("dotenv").config();

// Pool = un ensemble de connexions réutilisables vers PostgreSQL,
// plus efficace que d'ouvrir une nouvelle connexion à chaque requête
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;
