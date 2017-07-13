var expect = require('chai').expect;
var Survey = require('../models/survey');
var start = require('../server/controllers/admin');
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/survey_test';
mongoose.connect(uri, { config: { autoIndex: true } });
 
describe('survey', function(done) {
  beforeEach(function(done) {
    start.createSurvey();
    done();
  });

  afterEach(function(done) {
    //start.clean();
  });

  it('should populate the questions and answers choices through populateFromLatest', function() {
    Survey.populateFromLatest((survey) => {
      expect(survey.questions[1].answers[0]).to.be.true;
    });
  });
});

