var User = require('../models/user'),
    crypto = require('crypto'),
		LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
	passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
	  function(username, password, done) {
      User.findOne({email: username}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }
        if (user.password == crypto.createHash('md5').update(password).digest('hex')) {
          var user = {
            first_name: user.first_name,
            _id: user._id,
            survey_status: user.survey_status
          }
          return done(null, user);
        }
      });
    }
	));

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});
}