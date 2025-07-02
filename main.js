const cardContainer = document.querySelector(".char-cards");
const favCards = document.querySelector(".fav-cards");

const searchBox = document.querySelector("#search");

const navBtns = document.querySelectorAll(".nav-btn");
const sortBtns = document.querySelectorAll(".sort-btn");

const collectionCount = cardContainer.children;

/* Nav Buttons */
for (const btn of navBtns) {
  btn.addEventListener("click", () => {
    const button = document.querySelector(".nav-btn.active");
    const activeNav = document.querySelector(`#${btn.dataset.open}`);
    if (button !== null) {
      button.classList.remove("active");
    }
    btn.classList.add("active");

    document
      .querySelector(".cards-container.active")
      .classList.remove("active");
    activeNav.classList.add("active");

    updateCount(activeNav.children);
  });
}

/* Functions */
function displayCards(data) {
  for (const char of data) {
    let race = "";
    if (char.affiliation === "Z Fighter") {
      race = "z-fighter";
    } else if (char.affiliation === "Freelancer") {
      race = "freelancer";
    } else race = "army-of-frieza";

    const card = cardContainer.appendChild(document.createElement("div"));
    card.className = "card";
    card.dataset.name = `${char.name.toLowerCase()}`;
    card.dataset.race = `${race}`;
    card.id = `${char.name.toLowerCase()}`;

    card.innerHTML = `
    <img
    class="avatar"
    src='${char.image}'
    alt=""
    />
    <ul class="ul-default-none card-info">
    <li class="detail">Name: <span>${char.name}</span></li>
    <li class="detail">Race: <span>${char.race}</span></li>
    <li class="detail">Affiliation: <span>${char.affiliation}</span></li>
    </ul>
    <button class="add-btn">Add to Favorites</button>`;
  }
}

function searchForName() {
  const cardsArray = document.querySelectorAll(".card");

  searchBox.addEventListener("keyup", (e) => {
    const searchInput = e.target.value.toLowerCase().trim();

    cardsArray.forEach((card) => {
      if (card.dataset.name.includes(searchInput)) {
        card.style.display = "block";
      } else card.style.display = "none";
    });
  });
}

function addRemoveBtn() {
  const arrayOfButtons = document.querySelectorAll(".add-btn");

  for (const btn of arrayOfButtons) {
    btn.addEventListener("click", function () {
      if (btn.textContent === "Add to Favorites") {
        btn.textContent = "Remove";
        favCards.appendChild(btn.parentElement);
      } else {
        btn.textContent = "Add to Favorites";
        cardContainer.appendChild(btn.parentElement);
      }
    });
  }
}

function sortNames() {
  for (const btn of sortBtns) {
    btn.addEventListener("click", function () {
      const activeCard = document.querySelector(".cards-container.active");
      const itemsArray = Array.from(activeCard.children).map(
        (item) => item.dataset.name
      );
      const sortedArr =
        btn.id === "asc" ? itemsArray.sort() : itemsArray.sort().reverse();

      itemsArray.forEach((item) =>
        activeCard.appendChild(document.querySelector(`#${item}`))
      );
    });
  }
}

function updateCount(collection) {
  let zFighter = 0;
  let armyOfFrieza = 0;
  let freelancer = 0;

  for (const item of collection) {
    if (item.dataset.race === "z-fighter") {
      zFighter += 1;
    } else if (item.dataset.race === "freelancer") {
      freelancer += 1;
    } else armyOfFrieza += 1;
  }

  const affiliationCount = document.querySelector(".affiliation");
  affiliationCount.innerHTML = `
    <li class="z-fighter">Z Fighters: ${zFighter}</li>
    <li class="'frieza">Army Of Frieza: ${armyOfFrieza}</li>
    <li class="freelancer">Freelancers: ${freelancer}</li>
  `;
}

/* Fetch Data */
async function createCards() {
  const data = await fetch("https://dragonball-api.com/api/characters").then(
    (data) => data.json()
  );

  displayCards(data.items);

  updateCount(collectionCount);

  searchForName();

  addRemoveBtn();

  sortNames();
}

createCards();
