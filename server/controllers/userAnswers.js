const UserAnswer = require('../../models/userAnswer');

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
        res.status(200).send(obj);
      }
    });
  });
}