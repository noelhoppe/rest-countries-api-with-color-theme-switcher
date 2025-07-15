import type { DetailCountryInformation } from "../types/detail";

export default async function fetchDetailCountryInformation(cca3: string): Promise<DetailCountryInformation> {
  const ENDPOINT = `https://restcountries.com/v3.1/alpha/${cca3}?fields=name,subregion,tld,currencies,languages,borders`
  const REQUEST_INIT: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  try {
    const response = await fetch(ENDPOINT, REQUEST_INIT);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    try {
      const country = await response.json();
      return {
        nativeName: country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "",
        subregion: country.subregion || "",
        tld: country.tld || [],
        currencies: country.currencies ? Object.values(country.currencies).map((currency) => currency.name) : [],
        languages: country.languages ? Object.values(country.languages) : [],
        borders: country.borders || []
      };
    } catch {
      throw new Error("Failed to parse successfull response as JSON")
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch detail country information: ${error.message}`);
    } else {
      throw new Error("Failed to fetch detail country information: Unknown error");
    }
  }
}