'use strict';

var mongoose = require('mongoose');

// var url = 'mongodb://localhost:27017/akinodb';
var url = 'mongodb://admin:admin@ds235788.mlab.com:35788/akinodb'

mongoose.connect(url).then(() => {
	console.log('connection success');
}).catch(error => {
	console.log('Connect fail: ', error.stack);
	process.exit(1);
});

var schema = mongoose.Schema({
	title: String,
	description: String,
	images: String
}, {versionKey: false});


module.exports = mongoose.model('', schema, 'animeCharacter');