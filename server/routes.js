var auth = require('./controllers/auth'),
    questionnaire = require('./controllers/questionnaire'),
    admin = require('./controllers/admin');

module.exports = function(app, passport) {
  //Authentication
  app.post('/signup', auth.signup);
  app.get('/login', passport.authenticate('local'), auth.login);
  app.get('/getUser', auth.getUser);
  app.get('/logout', auth.logout)

  //Survey
  app.get('/getSurvey', questionnaire.getSurvey);
  app.post('/saveUserAnswers', questionnaire.saveUserAnswers);
  app.get('/retrieveUserAnswers', questionnaire.retrieveUserAnswers);
  app.post('/updateSurveyStatus', questionnaire.updateSurveyStatus);

  //Admin uses
  app.post('/updateQuestions', admin.updateQuestions);
  app.post('/updateSurvey', admin.updateSurvey);
}
