const User = require('../../models/user');

module.exports.updateSurveyStatus = function(req, res) {
  User.findOneAndUpdate({_id: req.body.user_id}, 
    {$set: {survey_status: req.body.survey_status}}, 
    function(err, user) {
      if (err) res.status(401).send('Error occured in retiring survey.');
      else {
        //Also update PassportJS user session's survey_status
        user.survey_status = req.body.survey_status;
        req.login(user, function(err){
          if (!err) res.status(200).send();
        });
      }
    }
  );
}