import styled from "styled-components";
import { HEIGHT_HEADER } from "../../components/Header";


const MainWrapper = styled.main`
  height: calc(100vh - ${HEIGHT_HEADER}px);
  place-content: start;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  flex-wrap: wrap;
  padding: 0 1.5rem;
  grid-gap: 2rem 2rem;
  margin-top: 2rem;
  @media (min-width: 1200px) {
    margin-top: 0;
    grid-template-columns: 1fr 1fr;
    place-content: center;
  }
`;

const DetailImage = styled.img`
  object-fit: contain;
  max-height: 300px;
`;

const DetailTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
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

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 375px) {
    > div {
      font-size: 1.0625rem;
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
`;

const DetailInformationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  > dl {
    margin: 0;
  }
`;

const DetailInformationKeyValueWrapper = styled.div`
  display: flex;
  gap: 1rem;

  > dt {
    font-weight: ${({ theme }) => theme.typography.fontWeightSemibold};
  }

  > dd {
    margin: 0;
    font-weight: 200;
  }
`;

const BorderCountriesWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`


export default function Detail() {
  return (
    <MainWrapper>
      <DetailImage
        src="https://flagcdn.com/de.svg"
        alt="The flag of Germany is composed of three equal horizontal bands of black, red and gold."
      />
      {/* Right Side */}
      <InformationWrapper>
        <DetailTitle>Belgium</DetailTitle>
        <DetailInformationWrapper>
          <dl>
            <DetailInformationKeyValueWrapper>
              <dt>Native Name</dt>
              <dd>Belgie</dd>
            </DetailInformationKeyValueWrapper>
            <DetailInformationKeyValueWrapper>
              <dt>Region</dt>
              <dd>Europe</dd>
            </DetailInformationKeyValueWrapper>
            <DetailInformationKeyValueWrapper>
              <dt>Sub Region</dt>
              <dd>Western Europa</dd>
            </DetailInformationKeyValueWrapper>
            <DetailInformationKeyValueWrapper>
              <dt>Capital</dt>
              <dd>Brussels</dd>
            </DetailInformationKeyValueWrapper>
          </dl>
          <dl>
            <DetailInformationKeyValueWrapper>
              <dt>Top Level Domain</dt>
              <dd>.be</dd>
            </DetailInformationKeyValueWrapper>
            <DetailInformationKeyValueWrapper>
              <dt>Currencies</dt>
              <dd>Euro</dd>
            </DetailInformationKeyValueWrapper>
            <DetailInformationKeyValueWrapper>
              <dt>Languages</dt>
              <dd>Dutch, French, German</dd>
            </DetailInformationKeyValueWrapper>
          </dl>
        </DetailInformationWrapper>
        <BorderCountriesWraper>
          <span>Border Countries</span>
          <ul>
            <li>France</li>
            <li>Germany</li>
            <li>Netherlands</li>
            <li>Luxembourg</li>
          </ul>
        </BorderCountriesWraper>
      </InformationWrapper>
    </MainWrapper>
  );
}
