var express    = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.set('port', process.env.PORT || 3000);

// setup handlebars
var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

// setup static serving
app.use(express.static(__dirname + '/public'));


///// Routes Below ///////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.render('home');
});

// Dynamic About View

app.get('/about', (req, res) => {
  res.render('about', {
    //fortune: fortune.get(),
    // uncomment to invoke page specific test.
    // pageTestScript: '/qa/tests-about.js'
  });
});

//// Error Routes

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
