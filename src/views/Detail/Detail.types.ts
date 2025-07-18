import type { CountryCardProps } from "../Home/Home.types";

export type DetailCountryInformation = {
  nativeName: string; // e.g. "Deutschland"
  subregion: string; // e.g. "Central Europe"
  tld: string[]; // e.g. [".de"]
  currencies: {symbol: string, name: string}[]; // e.g. {symbol: "€", name: "Euro"}
  languages: string[]; // e.g. ["German"]
  borders: string[]; // e.g. ["AUT", "BEL", "CZE", ...]; cca3 codes of bordering countries
}

export type CountryDetailViewProps = CountryCardProps & DetailCountryInformation;