const API_URL = 'https://swapi.dev/api/starships'

export function fetchStarships() {
  return fetch(API_URL)
    .then(response => response.json());
}