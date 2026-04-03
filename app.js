const API_URL = "PASTE_WORKER_URL_HERE";

let room = new URLSearchParams(window.location.search).get("room") || "default";

async function addEntry() {
  const content = document.getElementById("entry").value;
  const author = document.getElementById("author").value;

  await fetch(API_URL + "/api/add", {
    method: "POST",
    body: JSON.stringify({ content, author, room })
  });

  document.getElementById("entry").value = "";
  loadEntries();
}

async function loadEntries() {
  const res = await fetch(API_URL + "/api/get?room=" + room);
  const data = await res.json();

  const container = document.getElementById("entries");
  container.innerHTML = "";

  data.forEach(e => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerText = `[${e.author}] ${e.content}`;
    container.appendChild(div);
  });
}

loadEntries();
setInterval(loadEntries, 3000);
