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
exports.create = async (req, res) => {
    try {
        const {name, description, price, stock, category_id} = req.body;
        const productQuery = "INSERT INTO product (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5)";
        await pool.query(productQuery, [name, description, price, stock, category_id]);
        res.redirect('/products');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

};

exports.newForm = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM category');
        res.render('products/new', { categories: rows});

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }

};
exports.editForm = async (req, res) => {
    try {
        const productId = req.params.id;
        const [productResult, categoryResult] = await Promise.all([
            pool.query('SELECT * FROM product WHERE id = $1', [productId]),
            pool.query('SELECT * FROM category ORDER BY name ASC')
        ]);

        if (productResult.rows.length === 0) {
            return res.status(404).send('Product not found');
        }

        const product = productResult.rows[0];
        const categories = categoryResult.rows;

        res.render('products/edit', {product: product, categories: categories});
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
exports.update = async (req, res) => {
    const productId = req.params.id;
    const {name, description, price, stock, category_id} = req.body;
    try {
        const query = `
            UPDATE product 
            SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 
            WHERE id = $6
        `;

        await pool.query(query, [name, description, price, stock, category_id, productId]);

        res.redirect('/products');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
exports.delete = async (req, res) => {
    try {
        await pool.query('DELETE FROM product WHERE id = $1', [req.params.id]);
        res.redirect('/products');

    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error');
    } 
};