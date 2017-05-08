var mongoose = require('mongoose');

//schema setup
var commentSchema = new mongoose.Schema({
	text:String,
	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	}
});

//compiling the schema into a model
// var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = mongoose.model('Comment', commentSchema);
