require("dotenv").config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var search = process.argv;
var selection = process.argv[2];

console.log("Welcome to Liri, the better version of Siri only with fewer functions");

        switch (selection) {
            case "my-tweets":
                tweeter();
                break;
            case "spotify-this-song":
                spotifyThis();
                break;
            case "movie-this":
                movie();
                break;
            case "do-what-it-says":
                doItNow();
                break;
        }

        function tweeter() {
            var twitterUser = process.argv[3];
            if (!twitterUser){
                twitterUser = "edwinhsia";
            }
            params = {screen_name: twitterUser};
            client.get("statuses/user_timeline/", params, function(error, tweets, response){
                if (!error){
                    for(var i = 0; i < tweets.length; i++) {
                        var twitterResults = "@" + tweets[i].user.screen_name + ": " + tweets[i].text + "\r\n" + tweets[i].created_at + "\r\n";
                        console.log(twitterResults);
                    }
                }
            });

            //Logging command
            fs.appendFile("log.txt", selection + "\n", function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }

        function spotifyThis() {
            if (!process.argv[3]) {
                songName = "Ace The Sign";
            }
            else {
                var songName = "";
                for (var i = 3; i < search.length; i++) {
                    if (i > 3 && i < search.length) {
                        songName = songName + "+" + search[i];
                    }
                    else {
                        songName += search[i];
                    }
                }
            }
            spotify.search({ type: "track", query: songName }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                else {
                    for (var i = 0; i < 5; i++) {
                        var songInfo = data.tracks.items;
                        console.log("Artist: " + songInfo[i].artists[0].name);
                        console.log("Song: " + songInfo[i].name);
                        console.log("Preview Link: " + songInfo[i].preview_url);
                        console.log("Album that the song is from: " + songInfo[i].album.name);
                        console.log("------------" + i + "------------");
                    }
                }
            });
        
            //Logging command
            console.log();
            fs.appendFile("log.txt", selection + "\n", function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }

        function movie() {
            var movieName = "";
            for (var i = 3; i < search.length; i++) {
                if (i > 3 && i < search.length) {
                  movieName = movieName + "+" + search[i];
                }
                else {
                  movieName += search[i];
                }
              }
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            request(queryUrl, function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("imdb Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                }
            })
               
            //Logging command
            fs.appendFile("log.txt", selection + "\n", function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }

        function doItNow() {
            fs.readFile("random.txt", "utf8", function (err, data) {
                if (!err) {
                    doItNowResults = data.split(",");
                    spotifyThis(doItNowResults[0], doItNowResults[1]);
                }
                else{
                    console.log(err);
                }
            })
               
            //Logging command
            fs.appendFile("log.txt", selection + "\n", function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }