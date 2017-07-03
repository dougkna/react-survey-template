var crypto = require('crypto'),
    User = require('../../models/user');

module.exports.login = function(req, res) {
  if (!req.user) {
    res.status(401).send("error");
    return;
  } else {
    req.session.user = req.user;
    res.status(200).send(req.user);
  }
};

module.exports.logout = function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
}

module.exports.signup = function(req, res) {
  if (!req.body.email.trim() 
    || req.body.password.trim().length < 4
    || !req.body.first_name.trim()) {
      res.status(401).send('Please fill in all information correctly.');
      return;
  }
  //prevent duplicate emails
  User.findOne({email: req.body.email}, function(err, duplicate) {
    if (err) {
      res.status(401).send('Error');
      return;
    }
    if (duplicate) {
      res.status(401).send('Found duplicate email.');
      return;
    }
    else {
      var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
      req.body.password = hash;
      req.body['survey_status'] = 'new';

      var user = new User(req.body);
      user.save(function(err) {
        if (err) {
          res.status(401).send('Error in creating account.');
          return;
        }

        //Save user session to Passport + log in
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send(user);
        });
      });
    }
  });
}

module.exports.getUser = function(req, res) {
  res.status(200).send(req.user);
}






