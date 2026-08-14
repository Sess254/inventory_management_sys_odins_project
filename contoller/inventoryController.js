const db = require('../db/queries');



const getHome = (req, res) => {
    res.render('index', {title: 'Home'})
}

const getCategories = async (req, res) => {
    try {
        const categories = await db.getAllcategories();
        res.render('categories', { title: 'Categories', categories: categories });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

}

const getProducts = async (req, res) => {
    try {
        const products = await db.getAllProducts();
        res.render('products', { title: 'Products', products: products });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

}



module.exports = {
    getCategories,
    getHome,
    getProducts,
}