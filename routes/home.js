const express = require('express');
const Quiz=require('../modal/first');
const router = express.Router();
const cron = require('node-cron');
const { localsName } = require('ejs');


module.exports = router;

router.get('/quizzes',async(req,res)=>{
    res.render('createquiz',{title:"Quiz",msg:''});
})

router.post('/quizzes', async(req, res) => {
    
    
        var question = req.body.question;
        var options  = req.body.options;
        options=options.split(",");
        var rightAnswer=req.body.rightAnswer;
        var startDate=req.body.startDate;
        var endDate=req.body.endDate;
        var date2=new Date(req.body.endDate);
        var currdate=Date.now();
        var date1=new Date(req.body.startDate);
        if(currdate<date1){
            temp="inactive";
        }
        else if(currdate>date2){
            temp="finished";
        }
        else{
            temp="active";
        }
        

        var obj1 = new Quiz({
            question:question,
            options:options,
            rightAnswer:rightAnswer,
            startDate:startDate,
            endDate:endDate,
            status:temp,

        })
        await obj1.save();
        res.render('createquiz',{title:"Quiz",msg:"Quiz Created!Enter next if you want"});
        
        


            
       
           
            
});
router.get('/quizzes/active',async(req, res) => {
    var db=[];
    db=await Quiz.find({"status":"active"});
    res.render('activequizzes',{title:"Quiz",records:db});

    



});
router.post('/quizzes/:id/result', (req, res) => {
    var id=req.params.id;
    cron.schedule('0 5 * * *', function() {
    var temp=Quiz.findById({_id:id});
    console.log(temp);
  });

});
router.get('/quizzes/all', async(req, res) => {
    var data=[];
    data=await Quiz.find({});
    res.render('getall',{title:"Quiz",records:data});


});

router.get('/',async (req, res) => {
    var data=[];
    data=await Quiz.find({});
    res.render('home',{title:"Quiz",records:data});

    
})
router.get('/quizzes/attempt/:id', async(req, res) => {
    var data=[];
    var id=req.params.id;
    data=await Quiz.findById(id);
    res.render('attempt',{title:"Quiz",records:data,msg:''});
})
router.post('/quizzes/attempt/:id', async(req, res) => {
    var data=[];
    var id=req.params.id;
    data=await Quiz.findById(id);
    var ans=req.body.correctanswer;
    var str=(ans==data.rightAnswer)?"Correct":"Incorrect";

 
    res.render('attempt',{title:"Quiz",records:data,msg:str});
})
module.exports = router;