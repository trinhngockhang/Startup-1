const express= require('express');
const config= require('./config.json');
const mongoose= require('mongoose');
const examsRouter= require(__dirname+ '/modules/api/exams/');
const bodyParser= require('body-parser');

var app= express();

app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json({extend: true}));
app.use(bodyParser.urlencoded({extend: true}));
app.use('/exams', examsRouter);

mongoose.connect(config.connectionString, (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('connect DB success !');
  }
})

app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
})
