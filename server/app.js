require("dotenv").config();
const express = require("express")
const app = express()
const port = process.env.PORT || 5000

const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(express.json());

// we link the router files to make our route easy
app.use(require('./router/auth'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})