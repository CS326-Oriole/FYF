var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// A list of users who are online:
var online = require('../lib/online').online;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

var router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
  var user = req.session.user;
  
  //Check that user is logged in
  if(!user) {
    req.flash('login', 'not logged in');
    res.redirect('/user/login');
    //Check that user session hasn't expired
  } else if(user && online[user]) {
    req.flash('login', 'login expired');
    delete req.session.user;
    res.redirect('/user/login');
    //Check that user is admin
  } else if(!user.admin) {
    req.flash('home', 'you need admin credentials to access this route');
    res.redirect('/user/home');
  } else {
    var message = req.flash('admin') || '';
    //TODO: Add connection to database, populate fields
    res.render('admin', {});
  }
});
