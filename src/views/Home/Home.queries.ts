export type APIResponse = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
}[];

export async function fetchCountriesAll(): Promise<APIResponse> {
  const FIELDS = ["flags", "name", "cca3", "capital", "region", "population"];
  const ENDPOINT = `https://restcountries.com/v3.1/all?fields=${FIELDS.join(",")}`;
  const REQUEST_INIT: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  };

  try {
    const response = await fetch(ENDPOINT, REQUEST_INIT);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    try {
      const countries: APIResponse = await response.json();
      return countries;
    } catch {
      throw new Error(
        "In fetchCountriesAll: Failed to parse successful response as JSON"
      );
    }

  } catch(error) {
    if (error instanceof Error) {
      throw new Error(`In fetchCountriesAll: ${error.message}`);
    } else {
      throw new Error("In fetchCountriesAll: Unknown error");
    }
  }
}