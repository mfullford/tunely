var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let songSchema = new Schema({
	name: String,
	trackNumber: Number
});

let Song = mongoose.model('Song', songSchema);

module.exports = Song;