const express = require('express');
const PORT = 3008;
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");
const router = require('./router/router');

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use('/', router);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }

    console.log(`Listening on port ${PORT}`);
});