import type { APIResponse } from "./Home.queries"
import type { CountryCardProps } from "./Home.types"
import type { Region } from "./Home.types"

export function mapToCountryCardProps(
  countries: APIResponse
): CountryCardProps[] {
  return countries.map((c) => ({
    flag: c.flags.svg,
    flagAlt: c.flags.alt,
    commonName: c.name.common,
    population: c.population,
    capitals: c.capital,
    region: c.region as Region,
    cca3: c.cca3,
  }))
}