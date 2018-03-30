require("dotenv").config();

var keys = require("keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];


switch (action) {
case "my-tweets":
    tweets();
    break;
case "spotify-this-song":
    spotify();
    break;
case "movie-this":
    movie();
    break;
case "do-what-it-say":
    doItNow ();
    break;
}

function tweets() {

}

function spotify() {

}

function movie () {

}

function doItNow() {
    
}