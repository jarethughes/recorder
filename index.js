const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const port = 3000;
app.listen(port, () => console.log("Listening at " + port));

// app.get("/", function (request, response) {
//   response.send("Hello World!");
// });

app.post("/api", (request, response) => {
  const timestamp = Date.now();
  console.log("Request Received");
  const data = request.body;
  data.timestamp = timestamp;

  console.log(data);

  response.json({
    status: "success",
    timestamp: data.timestamp,
    artist: data.artist,
    album: data.album,
  });
  // const album = receiveData();
  // const tracklist = getTracklist(album);
  // postListens(tracklist);
});

// function receiveData(){} returns {artist: "", album: ""}
// function getTrackList(){} returns {artist: "", album: "", tracks: [{number: , title: ""},...]}
// function postListens(){} returns null

// **OLD: function postListens(){} returns the response.json {status: "", timestamp: "", songs: ["","",...]}
