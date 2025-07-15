import type { CountryCardProps } from "./home";

export type DetailCountryInformation = {
  nativeName: string; // e.g. "Deutschland"
  subregion: string; // e.g. "Central Europe"
  tld: string[]; // e.g. [".de"]
  currencies: string[]; // e.g. ["Euro"]
  languages: string[]; // e.g. ["German"]
  borders: string[]; // e.g. ["AUT", "BEL", "CZE", ...]; cca3 codes of bordering countries
}

export type CountryDetailViewProps = CountryCardProps & DetailCountryInformation;