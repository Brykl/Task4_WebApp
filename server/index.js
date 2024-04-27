const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('/login', (req, res) => {
    const userData = req.body;
    res.status(201).json({ message: "Server works", userData });
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})