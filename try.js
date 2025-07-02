// const apiData = fetch("https://dragonball-api.com/api/characters");

// const dbzdata = apiData.then((data) => data.json());

// dbzdata.then((data) => console.log(data));

// const listOpen = document.querySelector("[data-open]");

// const charContainer = document.querySelector(".char-cards");

// /* Character Cards */
// dbzdata.then((data) => {
//   for (const char of data.items) {
//     const card = charContainer.appendChild(document.createElement("div"));
//     card.classList.add("card");
//     card.id = `${char.id}`;
//     // card.innerHTML = ``
//   }
// });

const collection = new Set();

const per1 = { name: "Goku", race: "Saiyan" };
const per2 = { name: "Vegeta", race: "Saiyan" };

collection.add(per1);
collection.add(per2);

collection.delete({ name: "Goku", race: "Saiyan" });

console.log(collection);
