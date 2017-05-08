var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

//INDEX show all campgrounds
router.get('/campgrounds',function(req,res){
	//get all campgrounds from db;
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render('campgrounds/index',{campgrounds:allCampgrounds, currentUser:req.user});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

//CREATE - add new campground to DB
router.post('/campgrounds', middleware.isLoggedIn, function(req,res){
	//get data from form and add to campgrounds new Array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	//create an object
	var newCampground = {name:name, image:image, description:description, author:author};

	//create a new campground and save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to the get campgrounds page
			console.log(newlyCreated);
			res.redirect('/campgrounds');
		}
	});
});

//shows the form
router.get('/campgrounds/new', middleware.isLoggedIn, function(req,res){

	res.render('campgrounds/new');
});


//show more info about one campground
router.get('/campgrounds/:id', function(req,res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			//render show template with that campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render('campgrounds/edit', {campground: foundCampground});
	});
});

//UPDATE CAMPGROUND ROUTE
router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		}else{
			//redirect to show page
			console.log(updatedCampground);
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete('/campgrounds/:id/', middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;
