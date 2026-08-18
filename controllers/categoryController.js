const pool = require('../db/pool');

exports.list = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM category ORDER BY name');
        res.render('categories/index', { categories: rows});

    } catch(err) {
        console.error(err);
        res.status(500).send('Server err');
    }

}
exports.newForm = (req, res) => res.send('new product form');
exports.create = (req, res) => res.send('create product');

exports.show = async (req, res)  => {
    try {
        const categoryId = req.params.id;

        const categoryQuery = 'SELECT * FROM category WHERE id = $1';
        const categoryresult = await pool.query(categoryQuery, [categoryId]);

        if (categoryresult.rows.length === 0) {
           return  res.status(404).send('Category Not Found');
        }

        const category = categoryresult.rows[0];

        const productQuery = 'SELECT * FROM product WHERE category_id = $1';
        const productsResults = await pool.query(productQuery, [categoryId]);

        const products = productsResults.rows;

        res.render('categories/show', {category: category, products: products});

    } catch(err) {
        console.error(err)
        res.status(500).send('Server Error');
    }
};
exports.editForm = (req, res) => res.send('edit product form');
exports.update = (req, res) => res.send('update product');
exports.delete = (req, res) => res.send('delete product');