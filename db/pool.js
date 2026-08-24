// const { Pool } = require('pg');

// module.exports = new Pool ({
//     host: "localhost",
//     user: "sess",
//     database: "inventory",
//     password: "sess",
//     port: 5432,
// });

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

module.exports = pool;