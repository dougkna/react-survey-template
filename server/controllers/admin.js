//Temporary admin panel to create a survey to database 

const v1 = require('./survey_v1.json');
var Question = require('../../models/question'),
    Answer = require('../../models/answer'),
    Survey = require('../../models/survey');


module.exports.updateQuestions = function() {
  console.log('Questions to DB');
  var name = 'z_fashion_v1';

  v1[name].forEach((item) => {
    Question.update(
      {number: item.number}, 
      {survey_name: name, number: item.number, type: item.type, text: item.text, version : 1.0},
      {upsert: true, multi: true}, function(err, q) {
        if (!err) {
          for (var i = 0; i < item.possible_answers.length; i++) {
            //prevent duplicates
            if (q['upserted']) {
              var id = q['upserted'][0]['_id'];
              Answer.create({question_id: id, value: item.possible_answers[i], number: i});
            }
          }
        }
      }
    );
  });
}

module.exports.updateSurvey = function() {
  console.log('Survey to DB');
  var name = 'z_fashion_v1';
  Survey.create({name: name, published: true}, function(err, survey) {
    if (!err) console.log("New survey is created: ", survey)
  });
}