import type { APIResponse } from "./Detail.queries";
import type { DetailCountryInformation } from "./Detail.types";

export function mapToDetailCountryInformation(
  country: APIResponse
): DetailCountryInformation {
  return {
    nativeName: Object.values(country.name.nativeName)[0].common,
    subregion: country.subregion,
    tld: country.tld,
    currencies: Object.values(country.currencies).map((c) => ({
      symbol: c.symbol,
      name: c.name,
    })),
    languages: Object.values(country.languages),
    borders: country.borders,
  }
}