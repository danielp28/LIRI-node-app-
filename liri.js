require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)
var inquirer = require('inquirer');
var fs = require("fs");
var target 
function run() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What would you like me to do? Type help for a list of commands",
                name: "userDefiner"
            }
        ])
        .then(answer => {
            function switchIt(){
            switch (answer.userDefiner) {
                case "movie-this":
                    movie();
                    break;
                case "concert-this":
                    concert();
                    break;
                case "spotify-this-song":
                    song();
                    break;
                case "help":
                    help();
                    break;
                    case "do-what-it-says":
                        doIt();
                        break;
                default: console.log("Please choose a valid command");
                    run();
            }
            };
            switchIt();

            function movie() {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What movie would you like to look up?",
                            name: "userMovie"
                        }
                    ]).then(movie => {
                        axios
                            .get("http://www.omdbapi.com/?apikey=trilogy&s=" + movie.userMovie)
                            .then(function (response) {
                                // If the axios was successful...
                                // Then log the body from the site!
                                console.log(response.data.Search[0]);
                            })
                            .catch(function (error) {
                                if (error.response) {
                                    // The request was made and the server responded with a status code
                                    // that falls out of the range of 2xx
                                    console.log(error.response.data);
                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                } else if (error.request) {

                                    console.log(error.request);
                                } else {
                                    // Something happened in setting up the request that triggered an Error
                                    console.log("Error", error.message);
                                }
                                console.log(error.config);
                            });

                    })
                    

            }



            function song() {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What song would you like to look up?",
                            name: "userSong"
                        }
                    ]).then(function (song) {
                        spotify.search({ type: 'track', query: song.userSong }, function (err, data) {
                            if (err) {
                                return console.log('Error occurred: ' + err);
                            }

                            console.log("Album: ", data.tracks.items[0].album.name);
                            console.log("Track: ", data.tracks.items[0].name);
                            console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
                            console.log("Preview: ", data.tracks.items[0].preview_url);
                        })
                    })
                    
            }


            function concert() {

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What artist would you like to see live?",
                            name: "userConcert"
                        }
                    ]).then(function (concert) {
                        axios
                            .get("https://rest.bandsintown.com/artists/" + concert.userConcert + "/events?app_id=codingbootcamp")
                            .then(function (response) {
                                // console.log(response.data)
                                console.log("Venue: ", response.data[0].venue);
                                console.log("Date: ", response.data[0].datetime)
                            })
                    })
                    
            }

            function doIt(){
                fs.readFile("random.txt","utf-8", function(err,data){
                    
                    var arr = data.split(",");
                    console.log(arr);
                    answer.userDefiner = arr[0]
                    switchIt()
                    
                })
            }

            function help() {
                console.log("I can do three things: \n spotify-this-song: Will look up a song for you \n movie-this: Allows you to look up a movie \n concert-this: Look up an artists next live performance")
                run();

            }

        });

}


run();