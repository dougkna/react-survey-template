const Survey = require('../../models/survey'),
      Question = require('../../models/question'),
      Answer = require('../../models/answer');

module.exports.getSurvey = function(req, res) {
  console.log('getSurvey user', req.user)
  if (!req.user) {
    console.log("No user");
    return;
  }

  //Get user from Passport session
  var user = req.user;
  if (user.survey_status === 'new') {
    promptSurvey(user._id, function(surveyArray) {
      res.send(surveyArray);
    });
  }
  if (user.survey_status === 'pending') {
    promptSurvey(user._id, function(surveyArray) {
      res.send(surveyArray);
    });
  }
  if (user.survey_status === 'retired' || user.survey_status == 'complete') {
    console.log('Skip survey')
    res.send('skip');
  }
}

function promptSurvey(id, callback) {
  Survey.findOne({published: true}, {}, {sort: {'created_at': -1 }}, function(err, survey) {
    if (err) console.log('No survey', err);
    else if (survey) {
      Question.find({survey_name: survey.name})
      .exec(function(err, questions) {
        var surveyArray = [];
        var processed = 0;
        questions.forEach((q) => {
          Answer.find({question_id: q['_id']}, function(err, answers) {
            if (err) console.log('Error', err);
            else if (answers) {
              answers = answers.sort((a,b) => a.number - b.number);
              var answers_id = getID(answers);
              var answers_value = getValue(answers);
              var QandA = Object.assign(q.toObject(), 
                { answers_id: answers_id, answers_value: answers_value }
              );
              processed++;
              surveyArray.push(QandA);

              if (processed === questions.length) {
                surveyArray.sort((a,b) => a.number - b.number);
                callback(surveyArray);
              }
            }
          });
        });
      });
    }
  });
}

function getID(answers) {
  return answers.map((ans) => ans._id);
}

function getValue(answers) {
  return answers.map((ans) => ans.value);
}