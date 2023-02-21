import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

let characters = [
  // {
  //   name: "rick",
  //   image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  //   status: "alive",
  //   occurrences: "51",
  //   type: "human",
  // },
  // {
  //   name: "morty",
  //   image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  //   status: "dead",
  //   occurrences: "51",
  //   type: "animal",
  // },
];

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
    if (response.ok) {
      const data = await response.json();

      // fill characters array with data from API

      characters = data.results.map((character) => {
        return {
          name: character.name,
          image: character.image,
          status: character.status,
          type: character.type,
          occurrences: character.episode.length,
        };
      });
      maxPage = data.info.pages;
      cardContainer.innerHTML = null;
      characters.forEach((character) => {
        const card = createCharacterCard(character);
        cardContainer.append(card);
      });
      console.log(data);

      pagination.textContent = `${page}/${maxPage}`;
      return data;
    } else {
      console.log("There is an error");
    }
  } catch (error) {
    console.log(error);
  }
}
fetchCharacters();

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  page = page + 1;
  fetchCharacters();
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  fetchCharacters();
  console.log(characters.name);
});
