
// This requires the necessary libraries for the webapp.
// (1) express - this provides the express web framework
// (2) handlebars - this provides the handlebars templating framework
var express    = require('express');
var handlebars = require('express-handlebars');
var model = require('./lib/model');
// The body parser is used to parse the body of an HTTP request.
var bodyParser = require('body-parser');

// Require session library.
var session    = require('express-session');

// Require flash library.
var flash      = require('connect-flash');

// The cookie parser is used to parse cookies in an HTTP header.
var cookieParser = require('cookie-parser');

// Morgan for server logging.
var morgan = require('morgan');

//////////////////////////////////////////////////////////////////////
///// Express App Setup //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// The express library is a simple function. When you invoke this
// function it returns an express web application that you build from.
var app = express();

// This will set an "application variable". An application variable is
// a variable that can be retrieved from your app later on. It is
// simply a key/value mapping. In this case, we are mapping the key
// 'port' to a port number. The port number will either be what you
// set for PORT as an environment variable (google this if you do not
// know what an evironment variable is) or port 3000.
app.set('port', process.env.PORT || 3000);

// This does the setup for handlebars. It first creates a new
// handlebars object giving it the default layout. This indicates
// that the default layout is called main.js in the views/layouts
// directory. We then set the app's view engine to 'handlebars' - this
// lets your express app know what the view engine is. We then set an
// app variable 'view engine' to 'handlebars'. This is mostly boiler
// plate so you need not worry about the details.


// setup handlebars

var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');


// This does the setup for static file serving. It uses express'
// static middleware to look for files in /public if no other route
// matches. We use the __dirname special variable which indicates the
// directory this server is running in and append it to '/public'.
app.use(express.static(__dirname + '/public'));

// The `testmw` function represents out testing middleware. We use
// this in our views to conditionally include the Mocha and Chai
// testing framework as well as our own tests. Because this is a
// middleware function it expects to receive the request object
// (`req`), response object (`res`), and `next` function as arguments.
// The `next` function is used to continue processing the request
// with subsequent routes.
function testmw(req, res, next) {
	// This checks the 'env' application variable to determine if we are
	// in "production" mode. An application is in "production" mode if
	// it is actually deployed. This can be set by the NODE_ENV
	// environment variable. It also checks to see if the request has
	// given a `test` querystring parameter, such as
	// http://localhost:3000/about?test=1. If the route has that set
	// then showTests will be set to a "truthy" value. We can then
	// use that in our handlebars views to conditionally include tests.
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test;
	// Passes the request to the next route handler.
	next();
}

// This adds our testing middleware to the express app.
app.use(testmw);

// Body Parser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Parser:
app.use(cookieParser());

// Session Support:
app.use(session({
  secret: 'octocat',
  // Both of the options below are deprecated, but should be false
  // until removed from the library - sometimes, the reality of
  // libraries can be rather annoying!
  saveUninitialized: false, // does not save uninitialized session.
  resave: false             // does not save session if not modified.
}));

// Flash Support.
app.use(flash());

// Morgan Logging Support.
// Using 'conbined' gives you Apache-style logging support.
app.use(morgan('combined'));


//TO-DO: User routes
app.use('/user', require('./routes/user-routes'));
app.use('/admin', require('./routes/admin-routes'));

//////////////////////////////////////////////////////////////////////
///// User Defined Routes ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var team = require('./lib/team.js');

app.get('/', (req, res) => {
	res.redirect('/user/login');
	/* Old, to be deleted
	res.render('home', {
	});
	*/
});

// Dynamic About View
app.get('/profile', (req,res) =>{
	res.redirect('/user/profile');
});

app.get('/about', (req, res) => {
	res.render('about', {
	});
});

app.get('/faq', (req, res) => {
	res.render('faq', {
	});
});

app.get('/login', (req, res) => {
	res.render('login', {
	});
});


app.get('/team', (req, res) => {
		var result = team.one(req.query.user);
		if (!result.success) {
			result = team.all(); //This catches the case when the user is not found or we are on the /team page
		}

		res.render('team', {
			members: result.data,
			pageTestScript: '/qa/tests-team.js'
		});
});


//////////////////////////////////////////////////////////////////////
///// Error Middleware ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// A middleware function that will be invoked if no other route path
// has been matched. HTTP 404 indicates that the resource was not
// found. We set the HTTP status code in the response object to 404.
// We then render our views/404.handlebars view back to the client.
function notFound404(req, res) {
	res.status(404);
	res.render('404');
}

// A middleware function that will be invoked if there is an internal
// server error (HTTP 500). An internal server error indicates that
// a serious problem occurred in the server. When there is a serious
// problem in the server an additional `err` parameter is given. In
// our implementation here we print the stack trace of the error, set
// the response status code to 500, and render our
// views/500.handlebars view back to the client.
function internalServerError500(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
}

// This adds the two middleware functions as the last two middleware
// functions. Because they are at the end they will only be invoked if
// no other route defined above does not match.
app.use(notFound404);
app.use(internalServerError500);

//////////////////////////////////////////////////////////////////////
//// Application Startup /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Starts the express application up on the port specified by the
// application variable 'port' (which was set above). The second
// parameter is a function that gets invoked after the application is
// up and running.
var server = app.listen(app.get('port'), () => { //the server var is only used by socket.io
	console.log('Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate');
});

var model = require('./lib/model');

process.on('SIGINT',function() {
	console.log("Caught interrupt signal");
	console.log("Destroying anonymous collection");
	model.destroy(function(err, resp) {
		if(err){
			console.log(err);
			process.exit(0);
		}
		else{
			console.log('destroyed');
			process.exit(0);
		}
	});

});

//socket.io stuff starts here
var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log("\nCONNECTION FOUND\n");
	//whenever a chat_message msg is recieved, send it back
	socket.on('chat_message', function(msg){
			io.emit('chat_message', msg);

			// there should be an id with this
			/*
			model.addChat(msg.m, 1 , msg.sub, function(err,cb){
				if(err){
					console.log("error adding to db");
				}
				else{
					console.log("added chat to db");
				}
			});

			model.lookupChat(msg.m, msg.sub, function( err,chat){
				if(err){
					console.log(err);
				}
				else{
					chat.forEach(function(chat1){
						io.emit('chat_message', chat1.field);
					});
				}


			*/
	});

	//The function here will get called every time a chat is created
	socket.on('chat_created', function(box_info) {
		io.emit('create_chatbox', box_info);
	});
});
