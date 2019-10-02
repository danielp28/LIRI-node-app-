require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)
var userDefiner = process.argv[2];
var userSearch = process.argv.slice(3).join(" ")


if (userDefiner === "movie-this") {
    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&s=" + userSearch)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
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

}


if (userDefiner === "spotify-this-song")
    spotify.search({ type: 'track', query: userSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Album: ", data.tracks.items[0].album.name);
        console.log("Track: ", data.tracks.items[0].name);
        console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
        console.log("Preview: ", data.tracks.items[0].preview_url);
    })

    if (userDefiner === "concert-this"){
        axios
        .get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp")
        .then(function(response){
            // console.log(response.data)
            console.log("Venue: ", response.data[0].venue);
            console.log("Date: ", response.data[0].datetime)
        })
    }