import styled from "styled-components";
import type { CountryCardProps } from "../../../types/home";

const CountryCardWrapper = styled.article`
  background-color: ${({ theme }) => theme.color.elements};
  color: ${({ theme }) => theme.color.text};
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 16px 0 ${({ theme }) => theme.color.background}, 0 1.5px 6px 0 rgba(0,0,0,0.07);
`;

const CardLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CountryCardFlag = styled.img`
  border-radius: 10px 10px 0 0;
  height: 175px;
  width: 100%;
  object-fit: cover;
`;

const CountryCardContent = styled.div`
  padding: 1rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CountryCardTitle = styled.h2`
  font-size: 1rem;
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  @media (min-width: 375px) {
    font-size: 1.125rem;
  }
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.75rem;
    min-height: 70px;
  }
`;

const StyledDL = styled.dl`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > div {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  @media (min-width: 375px) {
    > div {
      font-size: 1rem;
    }
  }
  @media (min-width: 768px) {
    > div {
      font-size: 1.125rem;
    }
  }
  @media (min-width: 1024px) {
    > div {
      font-size: 1.5rem;
    }
  }

  dt {
    font-weight: ${({ theme }) => theme.typography.fontWeightSemibold};
    margin: 0;
  }
  dd {
    margin: 0;
    font-weight: 200;
  }
`;

export default function CountryCard({
  flag,
  flagAlt,
  commonName,
  population,
  capitals,
  region,
  cca3
}: CountryCardProps) {
  return (
    <CountryCardWrapper key={cca3}>
      <CardLink/>
      <CountryCardFlag src={flag} alt={flagAlt} />
      <CountryCardContent>
        <CountryCardTitle>{commonName}</CountryCardTitle>
        <StyledDL>
          <div>
            <dt>Population:</dt>
            <dd>{population.toLocaleString("de-DE")}</dd>
          </div>
          <div>
            <dt>Region:</dt>
            <dd>{region}</dd>
          </div>
          <div>
            <dt>Capital:</dt>
            <dd>{capitals.join(", ")}</dd>
          </div>
        </StyledDL>
      </CountryCardContent>
    </CountryCardWrapper>
  )
}