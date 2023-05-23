const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("Hello, World this is the first visit");
    res.json({
        name:"AI Dojo",
    })
})


app.listen(port, () => {
    console.log(`This app is running on port http://localhost:${port}`);
})