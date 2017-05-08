var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: 'Cloud\'s Rests',
		image: 'https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg',
		description: 'First camping ground'
	},

	{
		name: 'Joy Sunrise',
		image: 'https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg',
		description: 'Second camping ground'
	},

	{
		name: 'Haven Onboard',
		image: 'https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg',
		description: 'Third camping ground'
	}
];


function seedDB(){
	//removed all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log('removed campgrounds!');
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log('added a campground');
					//create a comment
					Comment.create(
						{
							text: 'This place is great but i wish there was internet',
							author: 'Homer'
						},function(err, comment){
						if(err){
							console.log(err);
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log('Created new comment');
						}
					});
				}
			});
		});
	});

	//add a few comments

}

module.exports = seedDB;
