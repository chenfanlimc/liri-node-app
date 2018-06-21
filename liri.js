require("dotenv").config();
var keys = require("./keys")
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var function_type = process.argv[2];
var search_query = process.argv[3];

switch (function_type) {
    case "spotify-this-song":
        spotify.search({
            type: "track", query: search_query
        }, function (err, data) {
            if (err) {
                return console.log("Error Result: " + err);
            }
            console.log(data);
        })
        break;
    case "my-tweets":
        var params = { screen_name: '@chlauper' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
        });
        break;
    default:
        console.log("Incorrect Format, Please Try Again");
}
