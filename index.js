const express = require('express');
var ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const myroutes=require('./routes/home');
const bodyParser = require('body-parser');
var path = require('path');

const  rateLimiit=require("express-rate-limit");

const limiter=rateLimiit({
    max:50,
    windowMs:60*60*1000,
    message:"Too many request from this IP ,please try again after some time "
})
app.use(limiter);


require('dotenv').config();
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);



app.use(express.json()); 
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(myroutes);






app.listen(process.env.PORT, () => {
    console.log("The API is running...")
})