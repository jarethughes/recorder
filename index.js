const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const port = 10191; // fear is the mind killer
app.listen(port, () => console.log("Listening at " + port));

const apiURL = "http://ws.audioscrobbler.com/2.0";
const apiKey = process.env.lastfmAPIKey;
const lastfmUsername = process.env.lastfmUser;

//console.log(apiKey);
//console.log(lastfmUsername);

const prod = false;

// app.get("/", function (request, response) {
//   response.send("Hello World!");
// });

app.post("/api", (request, response) => {
  const timestamp = Date.now();
  console.log("Request Received at " + timestamp);
  const data = request.body;
  data.tracklist = getTrackList(data);
  data.timestamp = timestamp;

  console.log("Data: ");
  console.log(data);
  console.log("Tracklist: ");
  console.log(data.tracklist);

  response.json({
    status: "success",
    timestamp: data.timestamp,
    artist: data.artist,
    album: data.album,
    tracklist: data.tracklist,
  });
  // const album = receiveData();
  // const tracklist = getTracklist(album);
  // postListens(tracklist);
});

async function getTrackList(inputData) {
  if (prod) {
    console.log("Getting tracklist...");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    };
    const response = await fetch(apiURL + apiKey, options);
    const responseJSON = await response.json();
    console.log("Response JSON: ");
    console.log(responseJSON);
    return responseJSON;
  } else {
    console.log("Faking getting tracklist...");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    };
    console.log("Options: ");
    console.log(options);
    return { track1: "fake track1", track2: "fake track2" };
  }
}

// function receiveData(){} returns {artist: "", album: ""}
// function getTrackList(){} returns {artist: "", album: "", tracks: [{number: , title: ""},...]}
// function postListens(){} returns null

// **OLD: function postListens(){} returns the response.json {status: "", timestamp: "", songs: ["","",...]}
