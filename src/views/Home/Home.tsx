// --- INTERN IMPORTS ---
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import { HashLoader } from "react-spinners";

// --- EXTERN IMPORTS ---
import Filterbar from "./components/Filterbar";
import CountryCard from "./components/CountryCard";
import type { Region } from "./Home.types";
import useGeneralCountriesInformation from "./hooks/useGeneralCountriesInformation";
import hslStringToHex from "../../utils/hslStringToHex";
import { ReactSpinnerWrapper } from "../../components/ReactSpinnerWrapper";

const GridContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
  padding: 0 1.5rem 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1.75rem 2rem 1.75rem;
  }
`;

export default function Home() {
  const [country, setCountry] = useState(""); // commonName of the Country
  const [region, setRegion] = useState<Region | undefined | null>(undefined);

  const { isPending, isError, data, error } = useGeneralCountriesInformation();
  const theme = useTheme();

  const handleSearchByCountryChange = (val: string) => {
    setCountry(val);
  };

  const handleFilterByRegionChange = (region: Region | null) => {
    setRegion(region);
  };

  const filteredCountries = data
    ?.filter((c) => !region || c.region === region)
    .filter((c) =>
      c.commonName.toLowerCase().trim().includes(country.toLowerCase().trim())
    );

  if (isError) {
    throw new Error(`
      Error while fetching counntries: ${
        error instanceof Error ? error.message : "Unknown error"
      }
    `);
  }

  return (
    <>
      <div
        style={{
          marginTop: "2rem"
        }}
      >
        <Filterbar
          onSearchByCountryChange={handleSearchByCountryChange}
          onFilterByRegionChange={handleFilterByRegionChange}
          region={region}
        />
      </div>

      {isPending && (
        <ReactSpinnerWrapper>
          <HashLoader size={100} color={hslStringToHex(theme.color.text)} />
        </ReactSpinnerWrapper>
      )}

      {!isPending && !isError && (
        <GridContainer>
          {filteredCountries?.map((country) => (
            <CountryCard key={country.cca3} {...country} />
          ))}
        </GridContainer>
      )}
    </>
  );
}
