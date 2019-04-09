// load modules
const express = require('express');
const hbs = require('express-handlebars');
//var cookieParser = require('cookie-parser');
const session = require('cookie-session');
// var MongoStore = require('connect-mongo')(session); //needs to know about the session
const bodyParser = require('body-parser');
// var mongoose = require('mongoose');

// var treat = ['a candy corn', 'a caramel apple', 'a lolipop', 'a skittle', 'a kit-kat', 'a gummy worm', ' a jawbreaker', 'gum'];

//var Treat = require('./models/treat');

// load .env
require('dotenv').config();

// create app
const app = express();

var PORT = process.env.PORT || 8081;

// init handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setup body parser middleware before routes that need them

//gets value of form fields from req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({
	secret: process.env.cookieSecret,

	secure: true,
	maxAge: 1000 * 60 * 60 * 24 * 7, //one day

	resave: true, //keep only if you want to keep last visit
	saveUninitialized: true, //for every site visitor
	
}));

//attach req.session.flash to res.locals (local variable)
app.use(function(req, res, next) {

	res.locals.flash = req.session.flash; //transfer to the local variable to render on page
	delete req.session.flash;
	next();
});

//req as a function and pass app as a parameter
var auth = require('.//lib/auth')(app, options);
auth.init(); //setup middleware related to authentication
auth.registerRoutes();

//home page
app.get('/', function(req, res) {

	//res.session.treats = req.body.treat;
	//console.log(res.session.treats);
	//console.log(req.session);
	// if (req.session.treat) {
		// if (req.cookies.treat) {
	return res.render('view', {
		//msg: 'You have a treat: ' + req.signedCookies.treat
		msg: 'Grab a treat!'
	});
});
//   return res.render('view', {
//     msg: 'No treats'
//   });
// });

//
app.get('/profile', function(req, res) {
	res.render('profile', {
		msg: 'You have a treat: ' + req.user.treats
	});
});

app.get('/treat', function(req, res) {

	res.render('view', {
		msg: 'Pick a treat'
	})
});

app.post('/treat', function(req, res) {
	var User = require('./models/user');
	User.findByIdAndUpdate(req.user._id, {$push: {treats: req.body.treat}}, function(err, user) {
		if (err) {
			res.status('500').json({
				status: 'error'
			});
		}
		return res.json(user.treats);
	});

});

app.post('/profile/add', function(req, res) {
	var User = require('./models/user');
	User.findByIdAndUpdate(req.user._id, {$push: {treats: req.body.treat}}, function(err, user) {
		if (err) {
			res.status('500').json({
				status: 'error'
			});
		}
		return res.json(user.treats);
	});

});

// app.get('/clear', function(req, res) {
// 	// res.clearCookie('treat');
// 	delete req.session.treat;
// 	req.session.flash = {
// 		type: 'negative', 
// 		header: 'No treat',
// 		body: 'The bag is empty'
// 	};
// 	//delete req.cookies.treat;
// 	res.redirect('/');
// });



// start server
app.listen(PORT, function() {
  console.log('listening on port ', PORT);
});