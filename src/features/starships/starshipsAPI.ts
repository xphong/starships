import { Starship } from "./starshipsSlice";

const API_URL = 'https://swapi.dev/api/starships'

interface StarshipResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Starship[];
}

export function fetchStarships(): Promise<StarshipResponse> {
  return fetch(API_URL)
    .then(response => response.json());
}

export function fetchStarshipsByPage(url: string): Promise<StarshipResponse> {
  return fetch(url)
    .then(response => response.json());
}