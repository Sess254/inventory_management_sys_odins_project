const { Pool } = require('pg');

module.exports = new Pool ({
    host: "localhost",
    user: "sess",
    database: "inventory",
    password: "sess",
    port: 5432,
});