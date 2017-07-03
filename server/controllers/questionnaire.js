var mongoose = require('mongoose'),
    User = require('../../models/user'),
    Survey = require('../../models/survey'),
    Question = require('../../models/question'),
    Answer = require('../../models/answer'),
    UserAnswer = require('../../models/userAnswer');

module.exports.getSurvey = function(req, res) {
  var id = req.query.user;
  User.findOne({_id: id}, function(err, user) {
    if (err) {
      console.log("No user", err);
      return;
    }
    if (!user) {
      res.status(401).send("User null");
      return;
    }
    if (user.survey_status == 'new') {
      promptSurvey(id, function(surveyArray) {
        res.send(surveyArray);
      });
    }
    if (user.survey_status == 'pending') {
      promptSurvey(id, function(surveyArray) {
        res.send(surveyArray);
      });
    }
    if (user.survey_status == 'retired' || user.survey_status == 'complete') {
      console.log('Skip survey')
      res.send('skip');
    }
  });
}

function promptSurvey(id, callback) {
  Survey.findOne({published: true}, {}, {sort: {'created_at': -1 }}, function(err, survey) {
    if (err) console.log('No survey', err);
    else if (survey) {
      Question.find({survey_name: survey.name})
      .exec(function(err, questions) {
        var processed = 0;
        var surveyArray = [];
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

module.exports.saveUserAnswers = function(req, res) {
  var answers = JSON.parse(req.body.picked_answers);
  var key = Object.keys(answers);

  if (key.length === 0) {
    res.status(200).send('Nothing to save.');
    return;
  } else {
    for (var i = 0; i < key.length; i++) {
      UserAnswer.update(
        {user_id: req.body.user_id, question_id: key[i]}, 
        {$set: {user_id: req.body.user_id, answer_id: answers[key[i]]}}, 
        {upsert: true}, function(err) {
          if (err) res.status(401).send('Answer not saved.');
        }
      );
      if (i === key.length - 1) {
        res.status(200).send('success');
        return;
      }
    }
  }
}

module.exports.retrieveUserAnswers = function(req, res) {
  var obj = {};
  var processed = 0;

  UserAnswer.find({user_id: req.query.user_id}, function(err, answers) {
    answers.forEach((ans) => {
      obj[ans.question_id] = ans.answer_id;
      processed++;

      if (processed === answers.length) {
        res.status(200).send(obj)
      }
    });
  });
}

module.exports.updateSurveyStatus = function(req, res) {
  User.findOneAndUpdate({_id: req.body.user_id}, {$set: {survey_status: req.body.survey_status}}, function(err, user) {
    if (err) res.status(401).send('Error occured in retiring survey.');
    else {
      //Also update PassportJS user session's survey_status
      user.survey_status = req.body.survey_status;
      req.login(user, function(err){
        if (!err) res.status(200).send();
      });
    }
  });
}
