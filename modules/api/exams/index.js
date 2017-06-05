  const express= require('express');
  const Router= express.Router();
  const examsController= require('./examsController');

  Router.post('/add',(req,res)=>{
    var object= {};
    object.school= req.body.school;
    object.subject= req.body.subject;
    object.numberOfQuestions= req.body.numberOfQuestions;
    object.answers = req.body.answers;
    object.examspath = req.body.examspath;
    examsController.saveExam(object, (err, data)=>{
      if(err){
        console.log(err);
        res.send('error');
      }else{
        console.log(data);
        res.send('success');
      }
    })
  })

  Router.get('/',(req,res) =>{
    if(req.query.school){
      examsController.searchExamsBySchool(req.query.school,(err,doc) =>{
        if(err){
          res.send('err');
        }else {
          res.send(doc);
          console.log('sent');
        }
      })
    }else{
    examsController.getAllExams((err,doc) =>{
      if(err){
        console.log(err);
        res.send('error');
      }else{
        console.log('sent');
        res.send(doc);
      }
    }
    )}
  })



  module.exports= Router;
