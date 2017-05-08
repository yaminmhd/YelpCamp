var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	//Campground = require('./models/campground'),
	//Comment = require('./models/comment'),
	User = require('./models/user');
	//seedDB = require('./seeds');


//requiring routes
var	commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campground'),
	authRoutes = require('./routes/index');

var url = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
mongoose.connect(url);
//mongoose.connect('');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: 'Once again Rusty wins cutest dog!',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log('Yelp Camp Server has started!');
});


//create a db entry
// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg',
// 		description: 'This a huge granite hill, no bathroom. No water. Beautiful granite hill'

// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log('NEWLY CREATED CAMPGROUND');
// 			console.log(campground);
// 		}
// 	});


// name: 'Mountain Goat's Rest', image: 'https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg'
