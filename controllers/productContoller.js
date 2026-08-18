const pool = require('../db/pool');


exports.list = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT product.id, product.name, product.price, product.stock, category.name AS category_name
            FROM product
            JOIN category ON product.category_id = category.id`
        );

        res.render('products/index', { products: rows });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

exports.show = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT product.id, product.name, product.description, product.price, product.stock, category.name AS category_name
            FROM product
            JOIN category ON product.category_id = category.id
            WHERE product.id = $1`,
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).send('Product Not Found');
        }

        res.render('products/show', { product: rows[0]});
    } catch (err){
        console.error(err);
        res.status(500).send('Server Error'); 
    }
};
exports.create = (req, res) => res.send('create product');
exports.newForm = (req, res) => res.send('show product');
exports.editForm = (req, res) => res.send('edit product form');
exports.update = (req, res) => res.send('update product');
exports.delete = (req, res) => res.send('delete product');