require("dotenv").config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

// var action = process.argv[2];
var search = process.argv;
var selection = process.argv[2];
// var searchName = "";

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
            case "do-what-it-say":
                doItNow();
                break;
        }

        function tweeter() {
            var twitterUser = process.argv[3];
            if (!twitterUser){
                twitterUser = "edwinhsia";
            }
            params = {screen_name: twitterUser};
            twitter.get("statuses/user_timeline/", params, function(error, tweets, response){
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
            for (i = 3; i < search.length; i++) {
                search = search + " " + search[i];
            }
            if (!search){
                search = "The Sign";
            }
            params = search;
            spotify.search({ type: "track", query: params }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                else {
                    console.log(data);
                }
              });
            // Artist(s)
            // The song's name
            // A preview link of the song from Spotify
            // The album that the song is from
               
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
            fs.readFile("random.txt", function (err, data) {
                if (!err) {
                    doItNowResults = data.split(",");
                    spotify(doItNowResults[0], doItNowResults[1]);
                }
                else{
                    console.log(err);
                }
            })
               
            //Logging command
            fs.appendFile("log.txt", selection+"\n", function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
