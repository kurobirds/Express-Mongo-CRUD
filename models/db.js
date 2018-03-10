var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title: String,
	description: String,
	images: String
}, {versionKey: false});

module.exports = mongoose.model('',schema, 'animeCharacter');