var express = require('express');
var handlebars = require('express-handlebars');


var app = express();

app.set('port',process.env.PORT || 3000);


// setup handlebars 
var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');


//call to home handlebars to show homepage

app.get('/',(req, res) =>{

	res.render('home');
});

app.get('/team',(req,res)=>{
	res.render('team');
});

//Error routes

app.use((req, res) => {
        res.status(404);
	res.render('404');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//// Application startup

app.listen(app.get('port'), () => {
	console.log('Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate');
																						
});



