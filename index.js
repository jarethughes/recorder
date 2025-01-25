const express = require("express");
const app = express();
const port = 10191;

app.listen(port, () => console.log(`Listening at ${port}`));

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (request, response) => {
  console.log("Request Recieved");
  const data = request.body;

  response.json({
    status: "success",
    date: data.date,
    timestamp: data.timestamp,
  });
});
