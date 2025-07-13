import type { CountryCardProps } from "../types/home";

export default async function fetchGeneralCountryInformation(): Promise<CountryCardProps[]> {
  const ENDPOINT = "https://restcountries.com/v3.1/all?fields=name,population,capital,region,cca3,flags";
  const REQUEST_INIT: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  try {
    const response = await fetch(ENDPOINT, REQUEST_INIT);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    try {
      const countries = await response.json();
      return countries.map((country) => ({
        flag: country.flags.svg,
        flagAlt: country.flags.alt,
        commonName: country.name.common,
        population: country.population,
        capitals: country.capital,
        region: country.region,
        cca3: country.cca3
      }))
    } catch {
      throw new Error("Failed to parse successful response as JSON");
    }
  } catch(error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch general country information: ${error.message}`);
    } else {
      throw new Error("Failed to fetch general country information: Unknown error");
    }
  }
}