const API_URL = "https://rickandmortyapi.com/api/character";
let currentPage = 1;


const gallery = document.getElementById("character-gallery");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNum = document.getElementById("page-num");


async function loadCharacters(page = 1) {
  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();
    displayCharacters(data.results);
    updateButtons(data.info);
  } catch (error) {
    gallery.innerHTML = "<p>Error loading characters.</p>";
    console.error("Fetch error:", error);
  }
}


function displayCharacters(characters) {
  gallery.innerHTML = "";
  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <a href="character.html?id=${char.id}" target="_blank">
        <img src="${char.image}" alt="${char.name}" />
        <h3>${char.name}</h3>
        <p>Species: ${char.species}</p>
        <p>Status: <span class="${char.status.toLowerCase()}">${char.status}</span></p>
      </a>
    `;
    gallery.appendChild(card);
  });
}


function updateButtons(info) {
  pageNum.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = !info.next;
}


prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage);
});


function updateClock() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const time = now.toLocaleTimeString("en-GB")
  const date = now.toLocaleDateString("en-GB", options)
  document.getElementById("footer-clock").textContent = `${time} ${date}`;
}
setInterval(updateClock, 1000);
updateClock()

loadCharacters(currentPage);
