var express = require('express');

// This gives us access to the user "model".
//var model = require('../lib/user');

var model = require('../lib/model');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// A list of users who are online:
var online = require('../lib/online').online;
var count =0;
var nextUID =0;
// Provides a login view

function user(name,pass,admin,email,phone,interests){
	return{
		name: name,
		pass: pass,
		uid: ++nextUID,
		admin: admin,
    email: email,
    phone: phone,
    interests: interests
		};
}



router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user.name]) {
		req.flash('home', 'Already logged in.');
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
  	/*++count ;
*/    model.countAnon(function(err,count){
         model.addAnon(count+1,function (error, person) {
      // add the user to the map of online users:
      online[person.name] = person;

      // create a session variable to represent stateful connection
      req.session.user = person;

      // Pass a message to main:
      req.flash('home', 'Anonymous Login Successful');
      res.redirect('/user/home');
    });
    });

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
          else if (user) {
						console.log(user);
            // add the user to the map of online users:
            online[user.name] = user;

            // create a session variable to represent stateful connection
            req.session.user = user;

            // Pass a message to main:
            req.flash('home', 'Authentication Successful');
            res.redirect('/user/home');
          }
					else {
						req.flash('login', 'User does not exist');
            res.redirect('/user/login');
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
       res.render('chat',{
        title : result + 'Chat',
				category: result
       });
     }
}
});
router.post('/addChat',function(req,res){
  console.log('SENT TO ADD CHAT');
  console.log(req.body.chatName);
  model.addChat(req.body.html,req.body.chatId,req.body.category,req.body.chatName,undefined, function(err,save){
    if(err){
      console.log('ERROR SAVING');
    }
    else console.log('SAVED');
  });



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
    var admin = "Regular User";
		var username = user.username;
    var phone = user.phone;
    var email = user.email;
    var interests = user.interests;

    if (user.admin === true) {
      admin = "Administrator";
    }
		else if (!username) {
			username = "Anonymous User";
		}

    res.render('profile', {
      name: username,
      admin: admin,
      phone: phone,
      email:email,
      interests: interests

    });
  }


});

router.get('/about', function (req, res) {
  res.render('about', {
    title : 'About',
  });
});

router.post('/signup', function (req, res) {
  var name = req.body.name;
  var pass = req.body.pass;
  var confirm = req.body.confirm;
  var email = req.body.email;
  var interests = req.body.interests;
  var phone = req.body.phone;

  if (!name || !pass || !confirm || !email || !interests || !phone) {
    req.flash('login', 'Sign up unsuccessful. Please provide valid credentials.');
    res.redirect('/user/login');
  }
	else if (pass !== confirm) {
		req.flash('login', 'Sign up unsuccessful. Password and confirmation do not match.');
    res.redirect('/user/login');
	}

  else {
		var u = user(name,pass,false,email,phone,interests);
		console.log(u);
		model.userAdd(u,function(err, person) {
			if(err){
				if(err.code == 11000){
					req.flash('login', "Error: Username taken.");
					res.redirect('/user/login');
				}
				else{
					req.flash('login', 'Error: Internal Database Error');
					res.redirect('/user/login');
				}
			}
			else{
				req.flash('login', 'Sign Up Complete!');
				res.redirect('/user/login');
			}
	  });
  }
});

module.exports = router;
