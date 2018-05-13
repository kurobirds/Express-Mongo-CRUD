var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var animeCharacterSchema = new Schema({
	title: String,
	description: String,
	images: String,
});

module.exports = mongoose.model(
	"animeCharacters",
	animeCharacterSchema,
	"animeCharacter"
);
