var expect = require('chai').expect;
var User = require('../models/user');
 
describe('user', function() {
  it('should be invalid if first name is empty', function(done) {
    var user = new User();
    user.validate(function(err) {
      expect(err.errors.first_name).to.exist;
      done();
    });
  });
});

