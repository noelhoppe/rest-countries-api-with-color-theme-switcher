import { useState } from "react";
import Filterbar from "./components/Filterbar";
import styled from "styled-components";
import type { CountryCardProps, Region } from "../../types/home";
import { useQuery } from "@tanstack/react-query";
import fetchGeneralCountryInformation from "../../services/home";
import CountryCard from "./components/CountryCard";

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
  const { data } = useQuery({
    queryKey: ["generalCountryInformation"],
    queryFn: fetchGeneralCountryInformation
  })


  const handleSearchByCountryChange = (val: string) => {
    setCountry(val);
  }

  const handleFilterByRegionChange = (region: Region | null) => {
    setRegion(region);
  }

  const filteredCountries = data
    ?.filter((c) => !region || c.region === region)
    .filter((c) => c.commonName.toLowerCase().trim().includes(country.toLowerCase().trim()));

  return (
    <>
      <Filterbar 
        onSearchByCountryChange={handleSearchByCountryChange}
        onFilterByRegionChange={handleFilterByRegionChange}
        region={region}
      />
      <GridContainer>
        {filteredCountries?.map((country) => (
          <CountryCard key={country.cca3} {...country} />))}
      </GridContainer>
    </>
  )
}
