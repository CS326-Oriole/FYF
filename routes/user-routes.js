var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// A list of users who are online:
var online = require('../lib/online').online;

// Provides a login view
router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user.name]) {
    res.redirect('/user/home'); //Changed from main to home
  }
  else {
    // Grab any messages being sent to us from redirect:
    var message = req.flash('login') || '';
    res.render('login', { title   : 'User Login',
                          message : message });
  }
});

// Performs **basic** user authentication.
router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  var anon = req.query.anon;

  console.log("Anonymous: " + req.query.anon);


  if (anon) {
    model.addAnon(function (error, person) {
      // add the user to the map of online users:
      online[person.name] = person;

      // create a session variable to represent stateful connection
      req.session.user = person;

      // Pass a message to main:
      req.flash('home', 'Anonymous Login Successful');
      res.redirect('/user/home');
    })
  }

  else {
    // Redirect to main if session and user is online:
    if (user && online[user]) {
      res.redirect('/user/home');
    }
    else {
      // Pull the values from the form:
      var name = req.body.name;
      var pass = req.body.pass;

      if (!name || !pass) {
        req.flash('login', 'did not provide the proper credentials');
        res.redirect('/user/login');
      }
      else {
        model.lookup(name, pass, function(error, user) {
          if (error) {
            // Pass a message to login:
            req.flash('login', error);
            res.redirect('/user/login');
          }
          else {
            // add the user to the map of online users:
            online[user.name] = user;

            // create a session variable to represent stateful connection
            req.session.user = user;

            // Pass a message to main:
            req.flash('home', 'Authentication Successful');
            res.redirect('/user/home');
          }
        });
      }
    }
  }


});

// Renders the main user view.
router.get('/home', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  console.log("HELLO" + user);

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else if (user && !online[user.name]) {
    req.flash('login', 'Login Expired');
    delete req.session.user;
    res.redirect('/user/login')
  }
  else {
    // capture the user object or create a default.
    var message = req.flash('home') || 'Login Successful';
    res.render('home', {
      message: message
    });
  }
});


// Performs logout functionality - it does nothing!
router.get('/logout', function(req, res) {
  // Grab the user session if logged in.
  var user = req.session.user;

  // If the client has a session, but is not online it
  // could mean that the server restarted, so we require
  // a subsequent login.
  if (user && !online[user.name]) {
    delete req.session.user;
  }
  // Otherwise, we delete both.
  else if (user) {
    delete online[user.name];
    delete req.session.user;
  }

  // Redirect to login regardless.
  res.redirect('/user/login');
});

// Renders the users that are online.
router.get('/online', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    res.render('online', {
      title : 'Online Users',
      online: online
    });
  }
});

// Renders the users that are online.
router.get('/chat', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;
  var result = req.query.category;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    if (result !== "videogames" && result !== "sports" && result !== "hobbies") {
      res.status(404);
	    res.render('404');
    }
    else {
      res.render('chat', {
        title : result + 'Chat',
        category: result
      });
    }

  }
});

router.get('/FAQ', function (req, res) {
  res.render('FAQ', {
    title : 'FAQ',
  });
});

router.get('/profile', function (req, res) {

  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    var admin = "";

    if (user.admin === true) {
      admin = "Administrator";
    }

    res.render('profile', {
      name: user.name,
      admin: admin
    });
  }


});

router.get('/about', function (req, res) {
  res.render('about', {
    title : 'About',
  });
});

router.get('/team', function (req, res) {
  res.render('team', {
    title : 'Team',
  });
});


module.exports = router;
