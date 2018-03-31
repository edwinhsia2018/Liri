require("dotenv").config();
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");
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

// inquirer
//     .prompt([
//         {
//             type: "list",
//             message: "What are you trying to get Liri to do?",
//             choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-say"],
//             name: "choice"
//         },
//         {
//             type: "input",
//             message: "What would you like to search for?",
//             name: "searchName"
//         }
//     ]).then(function (responses) {
//         selection = responses.choice;

        switch (selection) {
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
                doItNow();
                break;
        }

        function tweets() {
            for (i = 2; i < search.length; i++) {
                search = search + " " + search[i];
            }
            console.log();
            client.get(path, params, callback);

            //Logging command
            fs.appendFile("log.txt", selection, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }

        function spotify() {
            for (i = 3; i < search.length; i++) {
                search = search + " " + search[i];
            }
            spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
              console.log(data); 
              });
            // Artist(s)
            // The song's name
            // A preview link of the song from Spotify
            // The album that the song is from
               
            //Logging command
            console.log();
            fs.appendFile("log.txt", selection, function (err) {
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
            fs.appendFile("log.txt", selection, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }

        function doItNow() {
            fs.readFile("random.txt", function (err, data) {

            })
               
            //Logging command
            fs.appendFile("log.txt", selection, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    // })