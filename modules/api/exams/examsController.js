const examsModel= require('./examsModel');

var saveExam= (object, callback)=>{
  examsModel.findOne({})
  .select('id')
  .sort({id:-1})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      callback(err);
    } else {
      var id;
      if (doc && doc.id) {
        id= doc.id + 1;
      }else {
        id=1;
      }
      object.id=id;
      examsModel.create(object, (err,doc) => {
        if (err) {
          console.log(err);
          console.log('message', err.message);
          callback(err);
        } else {
          callback(null,doc);
        }
      })
    }
  })
}

  var getAllExams = (cb) => {
    examsModel.find({})
    .exec((err,doc) => {
      if(err){
        cb(err);
        console.log('err');
      }else{
        cb(null,doc)
        console.log('ok');
      }
    })
  }

  var searchExamsBySchool = (searchString,cb) =>{
    try {
      examsModel.find({ $text: { $search: searchString } })
      .exec((err, doc) => {
        if (err) {
          cb(err);
          console.log(err);
        } else {
          cb(null, doc);
        }
      })
    } catch (e) {
      console.log(e);
      cb(e);
    }
  }



module.exports= {
  saveExam,
  getAllExams,
  searchExamsBySchool
}
