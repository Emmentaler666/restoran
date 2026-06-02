
const favoritesCount = document.querySelector("#favoritesCount");
const state = {
    search: "",
    category: "sve",
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
};
const categoryCards = document.querySelector("#categoryCards");
const menuContainer = document.querySelector("#menuContainer");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const statusMessage = document.querySelector("#statusMessage");

let items = [];

async function loadMenu() {
    try {
        setStatus("Učitavanje jelovnika...", "loading");

        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error("Greška pri učitavanju podataka.");
        }

        items = await response.json();

        fillCategories();
        renderCategoryCards();
        renderMenu(items);
        updateFavoritesCount();

    } catch (error) {
        setStatus("Jelovnik se trenutno ne može učitati.", "error");
        console.error(error);
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
        setStatus("Nema rezultata za pretragu.", "empty");
        return;
    }

    setStatus("");

    list.forEach(item => {
        const card = document.createElement("article");
        card.className = "card";

        const isFavorite = state.favorites.includes(item.naziv);

        card.innerHTML = `
            <img src="${item.slika}" alt="${item.naziv}">

            <div class="card-content">
              <h2>${item.naziv}</h2>
              <p>${item.opis}</p>
              <p><strong>${item.cijena} €</strong></p>

              <button
                  class="button favorite-btn ${isFavorite ? "saved" : ""}"
                  data-name="${item.naziv}">
                  ${isFavorite ? "✓ Spremljeno" : "❤ Favorit"}
              </button>
            </div>
        `;

        menuContainer.appendChild(card);
    });

    animateCards();
}



document.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-btn");
    if (!button) return;

    const itemName = button.dataset.name.trim();

    state.favorites = state.favorites
        .map(name => name.trim());

    if (state.favorites.includes(itemName)) {
        state.favorites = state.favorites.filter(name => name !== itemName);
    } else {
        state.favorites.push(itemName);
    }

    state.favorites = [...new Set(state.favorites)];

    localStorage.setItem("favorites", JSON.stringify(state.favorites));

    updateFavoritesCount();
    filterMenu();
});


function filterMenu() {
    state.search = searchInput.value.toLowerCase();

    const filtered = items.filter(item => {

        const matchesSearch =
            item.naziv.toLowerCase().includes(state.search);

        let matchesCategory = false;

        if (state.category === "sve") {
            matchesCategory = true;
        }
        else if (state.category === "favoriti") {
            matchesCategory =
                state.favorites.includes(item.naziv);
        }
        else {
            matchesCategory =
                item.kategorija === state.category;
        }

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

    formMessage.classList.remove("success", "error", "show");

    if (!form.checkValidity()) {
        formMessage.textContent =
            "⚠ Molimo ispunite sva obavezna polja.";

        formMessage.classList.add("error", "show");
        return;
    }



    const ime = document.querySelector("#ime")?.value;

    formMessage.textContent =
        `✅ Hvala ${ime}! Rezervacija je uspješno zaprimljena.`;

    formMessage.classList.add("success", "show");

    form.reset();

    setTimeout(() => {
        formMessage.classList.remove("show");
    }, 5000);
});

function animateCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";

        setTimeout(() => {
            card.style.transition = "0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 120);
    });
  }    

function renderCategoryCards() {
    const categories = [...new Set(items.map(item => item.kategorija))];

    categoryCards.innerHTML = `
        <div class="category-card active" data-category="sve">Sve</div>
        <div class="category-card" data-category="favoriti">❤ Favoriti</div>
    `;

    categories.forEach(category => {
        categoryCards.innerHTML += `
            <div class="category-card" data-category="${category}">
                ${category}
            </div>
        `;
    });

    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            const selectedCategory = card.dataset.category;

            state.category = selectedCategory;

            searchInput.value = "";
            state.search = "";

            document.querySelectorAll(".category-card")
                .forEach(c => c.classList.remove("active"));

            card.classList.add("active");

            filterMenu();
        });
    });
}

function setStatus(message, type = "") {
    if (!statusMessage) return;

    statusMessage.textContent = message;
    statusMessage.className = "";

    if (message && type) {
        statusMessage.classList.add("status-message", type);
    }
}

function updateFavoritesCount() {
    if (favoritesCount) {
        favoritesCount.textContent = `❤ Favoriti: ${state.favorites.length}`;
    }
}