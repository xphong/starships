import { StarshipResponse } from "./starshipsSlice";

const API_URL = 'https://swapi.dev/api/starships';

export function fetchStarshipsByPage(url: string = API_URL): Promise<StarshipResponse> {
  return fetch(url)
    .then(response => response.json());
}