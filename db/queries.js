const pool = require('./pool');
const db = require('./pool');


const getAllProducts = async () => {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
}

module.exports = {
    getAllProducts,
}