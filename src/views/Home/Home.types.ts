export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";
export type CountryCardProps = {
  flag: string; // e.g "https://flagcdn.com/de.svg"
  // e.g. "The flag of Germany is composed of three equal horizontal bands of black, red and gold."
  flagAlt: string; 
  commonName: string; // e.g. "Germany"
  population: number; // e.g. 83240525
  capitals: string[]; // e.g. ["Berlin"]
  region: Region; // e.g. "Europe"
  cca3: string; // ISO 3166-1 alpha-3 three unique letter country code, e.g "DEU"
}