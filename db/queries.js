const pool = require('./pool');


const getAllcategories = async () => {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

const getAllProducts = async () => {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
}


module.exports = {
    getAllcategories,
    getAllProducts,
}