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
exports.newForm = (req, res) => {
    res.render('categories/new');
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body
        const categoryNameQuery = `INSERT INTO category (name) VALUES ($1)`;
        await pool.query(categoryNameQuery, [name]);
        res.redirect('/categories');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

};

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
exports.editForm = async (req, res) => {
    const categoryId =  req.params.id;
    try {
        const query = 'SELECT * FROM category WHERE id = $1';
        const { rows } = await pool.query(query, [categoryId]);

        if (rows.length === 0) {
            return res.status(404).send('Category Not Found');
        }

        const category = rows[0];

        res.render('categories/edit', { category })

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
};


exports.update = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    try {
        const editCategoryQuery = `UPDATE category SET name = $1 WHERE id = $2`;
        await pool.query(editCategoryQuery, [name, categoryId]);

        res.redirect('/categories');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
};


exports.delete = (req, res) => res.send('delete product');