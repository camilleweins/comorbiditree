// load modules
// var express = require('express');
// var hbs = require('express-handlebars');
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
// var app = express();

var PORT = process.env.PORT || 8081;

//pass a secret
//app.use(cookieParser(process.env.cookieSecret));

// init handlebars
// app.engine('handlebars', hbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

//setup cookie parser and body parser middleware before routes that need them

// app.use(cookieParser({
// 	secret: process.env.cookieSecret
// }));

//gets value of form fields from req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


mongoose.connect(process.env.DB_URL);

var options = {};


app.use(session({
	secret: process.env.cookieSecret,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 7 //one day
	},
	resave: true, //keep only if you want to keep last visit
	saveUninitialized: true, //for every site visitor
	store: new MongoStore({
		url: process.env.DB_URL,
		update: MongoStore.update
	})
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

// app.post('/treat', function(req, res) {
// 	console.log(req.session.treat);
// 	//console.log(req.session);
// 	// var treat = new Treat ({
// 	// 	treat: req.body.treat
// 	// });
// 	// console.log(res.cookie(req.session.value));
// 	//var treat = ['candy corn', 'caramel apple', 'lolipop', 'skittles', 'kit-kat', 'gummy worms', 'jawbreakers', 'gum'];
// 	req.session.treat = treat[Math.floor(Math.random() * treat.length)];
// 	req.session.flash = {
// 		type: 'positive', 
// 		header: 'You got a treat (check your profile)',
// 		body: 'The treat is ' + req.session.treat
// 	};

// 	// cookie('treat', 'candy corn', {
// 	// 	httpOnly: true,
// 	// 	signed: true
// 	// });
// 	res.redirect('/');
// });

// app.post('/profile/add', function(req, res) {
// 	req.session.treats = 'red';
// 	req.session.flash = {
// 		type: 'positive', 
// 		header: 'You got a new treat (check your profile)',
// 		body: 'The treats are ' + req.session.treats
// 	};
// });

app.get('/clear', function(req, res) {
	// res.clearCookie('treat');
	delete req.session.treat;
	req.session.flash = {
		type: 'negative', 
		header: 'No treat',
		body: 'The bag is empty'
	};
	//delete req.cookies.treat;
	res.redirect('/');
});



// start server
app.listen(PORT, function() {
  console.log('listening on port ', PORT);
});