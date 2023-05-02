const mongoose=require('mongoose');
require('dotenv').config();


const mongoURI=process.env.DATABASE_URL;
var MongoDB=mongoose.connect(mongoURI).connection;
var conn =mongoose.Collection;
const QuizSchema = new mongoose.Schema({
    question: String,
    options : {type:Array,default:[]},
    rightAnswer: Number,
    startDate: String,
    endDate: String,
    status: String,
    answer: Number



})

module.exports = mongoose.model('Question', QuizSchema)