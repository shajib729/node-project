require("dotenv").config();
const express = require("express")
const app = express()
const port = process.env.PORT || 8000

require("./db/conn")
const User=require("./model/userSchema")

app.use(express.json());

// we link the router files to make our route easy
app.use(require('./router/auth'));

// Middleware
const middleware = (req, res, next) => {
    console.log(`Hello My Middleware`);
    next()
}

app.get("/", (req,res) => {
    try {
        res.send("Hello world from Home page")
    } catch (err) {
        console.log("Error Found");
    }
})

app.get("/about",middleware,(req,res) => {
    try {
        console.log("About");
        // res.cookie("Test","shajib")
        res.send("Hello world from About page")

    } catch (err) {
        console.log("Error Found");
    }
})

app.get("/contact", (req,res) => {
    try {
        res.send("Hello world from Contact page")
    } catch (err) {
        console.log("Error Found");
    }
})

app.get("/signin", (req,res) => {
    try {
        res.send("Hello world from Sign In page")
    } catch (err) {
        console.log("Error Found");
    }
})

app.get("/signup", (req,res) => {
    try {
        res.send("Hello world from Sign Up page")
    } catch (err) {
        console.log("Error Found");
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})