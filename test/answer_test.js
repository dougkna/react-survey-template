//5956f020b04c598b29b118a7
//5956f01fb04c598b29b118a2

var expect = require('chai').expect;
var Answer = require('../models/answer');
 
describe('answer', function(done) {
  it('should return answer choices of a question', function() {
    var answer = new Answer({question_id: '5956f01fb04c598b29b118a2'});
    answer.getAllAnswers(function(res) {
      console.log('res', res)
      expect(res).to.be.true;
      done();
    });
  });
});



