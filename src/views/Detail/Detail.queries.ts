export type APIResponse = {
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
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  };
  subregion: string;
  languages: {
    [key: string]: string;
  };
  borders: string[];
};

export default async function fetchCountryByCode(
  cca3: string
): Promise<APIResponse> {
  const FIELDS = ["name", "tld", "currencies", "subregion", "languages", "borders"]
  const ENDPOINT = `https://restcountries.com/v3.1/alpha/${cca3}?fields=${FIELDS.join(",")}`;
  const REQUEST_INIT: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch(ENDPOINT, REQUEST_INIT);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    try {
      const country: APIResponse = await response.json();
      return country;
    } catch {
      throw new Error(
        "In fetchCountryByCode: Failed to parse successful response as JSON"
      );
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `In fetchCountriesByCode: ${error.message}`
      );
    } else {
      throw new Error(
        "In fetchCountriesAll: Unknown error"
      );
    }
  }
}

