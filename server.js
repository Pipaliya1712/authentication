const bodyParser = require('body-parser');
const express = require('express')
const route = require('./userRoutes')
const mongoose = require("mongoose");
const {connectDB} = require("./dbConnection")
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs');
app.use(cookieParser());
 
connectDB();


app.use("/",route);

app.listen(PORT, () => {
    console.log("server is running")
})