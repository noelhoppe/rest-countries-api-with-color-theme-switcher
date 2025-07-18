import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import type { Region } from "../Home.types";

const RegionListWrapper = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.color.input};
  margin-top: 1rem;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 20px;
  z-index: 9999;
`;

const RegionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.text};
  padding: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font: inherit;
  outline: none;
`;

function RegionList({ onSelect }: { onSelect: (region: Region) => void }) {
  const regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  return (
    <RegionListWrapper id="regionList" role="listbox">
      {regions.map((region) => (
        <li key={region}>
          <RegionButton role="option" onClick={() => onSelect(region)}>
            {region}
          </RegionButton>
        </li>
      ))}
    </RegionListWrapper>
  );
}

const FilterbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 1.5rem;
  margin-bottom: 2rem;
`;

const SearchForCountryWrapper = styled.div`
  position: relative;
`;

const SearchForCountryInput = styled.input`
  padding-left: 48px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.input};
  color: ${({ theme }) => theme.color.text};
  border: none;
  outline: none;
  border-radius: 10px;

  &::placeholder {
    color: ${({ theme }) => theme.color.text};
  }
`;

const FilterByRegionWrapper = styled.div`
  position: relative;
  min-width: 200px;
`;

const FilterByRegionButton = styled.button`
  background-color: ${({ theme }) => theme.color.input};
  color: ${({ theme }) => theme.color.text};
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 0 0 0 24px;
  height: 56px;
  position: relative;
  width: 100%;
  text-align: left;
`;

const ClearRegionButton = styled.button`
  position: absolute;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  padding: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  outline: none;
`;

export const ChevronWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 24px;
  pointer-events: none;
  padding-left: 12px;
  border-left: 1px solid ${({ theme }) => theme.color.text};
`;

export default function Filterbar({
  onSearchByCountryChange,
  onFilterByRegionChange,
  region,
}: {
  onSearchByCountryChange: (val: string) => void;
  onFilterByRegionChange: (region: Region | null) => void;
  region: Region | undefined | null;
}) {
  const [filterByRegionIsOpen, setFilterByRegionIsOpen] = useState(false);
  return (
    <FilterbarWrapper>
      <SearchForCountryWrapper>
        <FaSearch
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
        <SearchForCountryInput
          type="text"
          placeholder="Search for country..."
          id="countrySearch"
          name="countrySearch"
          onChange={(evt) => onSearchByCountryChange(evt.target.value)}
        />
      </SearchForCountryWrapper>
      <FilterByRegionWrapper>
        <FilterByRegionButton
          aria-expanded={filterByRegionIsOpen}
          aria-controls="regionList"
          onClick={() => setFilterByRegionIsOpen(!filterByRegionIsOpen)}
        >
          <span>{region || "Filter by Region"}</span>
          {region && (
            <ClearRegionButton
              aria-label="Region Filter zurücksetzen"
              tabIndex={0}
              type="button"
              onClick={(evt) => {
                evt.stopPropagation()
                onFilterByRegionChange(null);
              }}
            >
              <IoCloseOutline />
            </ClearRegionButton>
          )}
          {filterByRegionIsOpen ? (
            <ChevronWrapper>
              <FaChevronUp />
            </ChevronWrapper>
          ) : (
            <ChevronWrapper>
              <FaChevronDown />
            </ChevronWrapper>
          )}
        </FilterByRegionButton>
        {filterByRegionIsOpen && (
          <RegionList
            onSelect={(region) => {
              setFilterByRegionIsOpen(false);
              onFilterByRegionChange(region);
            }}
          />
        )}
      </FilterByRegionWrapper>
    </FilterbarWrapper>
  );
}
