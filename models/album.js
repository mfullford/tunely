var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = require("./song");

let albumSchema = new Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genre: [String],
	songs: [Song.schema]
});

let Album = mongoose.model('Album', albumSchema);

module.exports = Album;
