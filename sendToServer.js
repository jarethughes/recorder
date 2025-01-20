const data = { artist, album };
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("submitButton")
    .addEventListener("click", postToServer());
});

async function postToServer(data) {
  const response = await fetch("/api", options);
  const responseJSON = await response.json();
  console.log(responseJSON);
}
