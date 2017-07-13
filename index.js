'use strict';

var fs = require('fs');
var path = require('path');

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      start = require('./server/controllers/admin');

//Passport
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//Parse application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
require("./server/routes")(app, passport);
require("./init/passport")(passport);

//MongoDB
var mongoUri = 'mongodb://localhost/db_questionnaire';

//Sample survey to DB
start.updateQuestions();
start.updateSurvey();


var compress = require('compression');
var layouts = require('express-ejs-layouts');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');


var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
  mongoUri = process.env.MONGODB_URI;
}
mongoose.connect(mongoUri, { config: { autoIndex: true } });

app.get('/*', function(req, res) {
  res.render('index', {
    env: env
  });
});

var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('Server running at port 3001.');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('webpack dev server listening on localhost:3000');
  });
}
