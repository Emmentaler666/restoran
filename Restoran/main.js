
const menuContainer = document.querySelector("#menuContainer");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const statusMessage = document.querySelector("#statusMessage");

let items = [];

async function loadMenu() {
  try {
    statusMessage.textContent = "Učitavanje jelovnika...";
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Greška pri učitavanju podataka.");
    }

    items = await response.json();
    fillCategories();
    renderMenu(items);
  } catch (error) {
    statusMessage.textContent = "Podaci se nisu mogli učitati.";
  }
}

function fillCategories() {
  const categories = [...new Set(items.map(item => item.kategorija))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderMenu(list) {
  menuContainer.innerHTML = "";

  if (list.length === 0) {
    statusMessage.textContent = "Nema rezultata.";
    return;
  }

  statusMessage.textContent = "";

  list.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `

        <img src="${item.slika}" alt="${item.naziv}">

        <div class="card-content">
            <h2>${item.naziv}</h2>
            <p>${item.opis}</p>
            <p><strong>${item.cijena} €</strong></p>
            <button class="button">Dodaj u favorite</button>
        </div>
    `;
    menuContainer.appendChild(card);
  });
}

function filterMenu() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = items.filter(item => {
    const matchesSearch = item.naziv.toLowerCase().includes(search);
    const matchesCategory = category === "sve" || item.kategorija === category;
    return matchesSearch && matchesCategory;
  });

  renderMenu(filtered);
}

searchInput?.addEventListener("input", filterMenu);
categoryFilter?.addEventListener("change", filterMenu);

if (menuContainer) {
  loadMenu();
}

const form = document.querySelector(".form");
const formMessage = document.querySelector("#formMessage");

form?.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        formMessage.textContent =
            "Molimo ispunite sva obavezna polja.";
        return;
    }

    formMessage.textContent =
        "Rezervacija je uspješno poslana!";

    form.reset();
});
