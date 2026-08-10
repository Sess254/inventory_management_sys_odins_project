const express = require("express");
const PORT = 3008;
const app = express();

const products = [
    {
        name: "Sony WH720n",
        description: "Lorem ipsum bla bla"
    }
]

app.get('/', (req, res) => {
    res.send(products);
})


app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }

    console.log(`Server listening on Port ${PORT}`);
})