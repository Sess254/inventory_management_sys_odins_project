const express = require('express');
const PORT = 3008;
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening on port ${PORT}`);
});