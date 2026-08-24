// const { Pool } = require('pg');

// module.exports = new Pool ({
//     host: "localhost",
//     user: "sess",
//     database: "inventory",
//     password: "sess",
//     port: 5432,
// });


const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://sess:sess@localhost:5432/top_users"
});
