// --- EXTERN IMPORTS ---
import styled, { useTheme } from "styled-components";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router";
import { HashLoader } from "react-spinners";

// --- INTERN IMPORTS ---
import useDetailCountryInformation from "./hooks/useDetailCountryInformation";
import hslStringToHex from "../../utils/hslStringToHex";
import { ReactSpinnerWrapper } from "../../components/ReactSpinnerWrapper";
import { ReactRouterLink } from "../../components/ReactRouterLink";

const MainWrapper = styled.main`
  place-content: start;
  display: grid;
  grid-template-columns: 1fr;
  place-items: stretch;
  flex-wrap: wrap;
  padding: 0 1.5rem;
  grid-gap: 2rem 2rem;
  margin-top: 2rem;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DetailImage = styled.img`
  object-fit: cover;
  @media (min-width: 1024px) {
    object-fit: contain;
  }
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
  place-self: start;
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
    place-self: center;
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
  align-items: center;
  gap: 1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const ReturnLink = styled(Link)`
  background-color: ${({ theme }) => theme.color.elements};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
`;

const BorderCountryItem = styled.li`
  background-color: ${({ theme }) => theme.color.elements};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  position: relative;
`;

export default function Detail() {
  const { cca3 } = useParams();
  const theme = useTheme();

  if (cca3 === undefined) {
    throw new Error("URL parameter cca3 is required but not found.");
  }
  const { isPending, isError, data, error } = useDetailCountryInformation(cca3);

  if (isError) {
    throw new Error(`
      Error while fetching country details: ${
        error instanceof Error ? error.message : "Unknown error"
      }
    `);
  }

  return (
    <>
      <div
        style={{
          padding: "0 1.5rem",
          marginTop: "2rem",
        }}
      >
        <ReturnLink to={"/countries/"}>
          <IoMdArrowBack />
          <span>Back</span>
        </ReturnLink>
      </div>

      {isPending && (
        <ReactSpinnerWrapper>
          <HashLoader size={100} color={hslStringToHex(theme.color.text)} />
        </ReactSpinnerWrapper>
      )}

      {!isPending && !isError && (
        <MainWrapper>
          <DetailImage src={data?.flag} alt={data?.flagAlt} />
          <InformationWrapper>
            <DetailTitle>{data?.commonName}</DetailTitle>
            <DetailInformationWrapper>
              <dl>
                <DetailInformationKeyValueWrapper>
                  <dt>Native Name</dt>
                  <dd>{data?.nativeName}</dd>
                </DetailInformationKeyValueWrapper>
                <DetailInformationKeyValueWrapper>
                  <dt>Region</dt>
                  <dd>{data?.region}</dd>
                </DetailInformationKeyValueWrapper>
                <DetailInformationKeyValueWrapper>
                  <dt>Sub Region</dt>
                  <dd>{data?.subregion}</dd>
                </DetailInformationKeyValueWrapper>
                <DetailInformationKeyValueWrapper>
                  <dt>Capital</dt>
                  <dd>{data?.capitals?.join(", ")}</dd>
                </DetailInformationKeyValueWrapper>
              </dl>
              <dl>
                <DetailInformationKeyValueWrapper>
                  <dt>Top Level Domain</dt>
                  <dd>{data?.tld?.join(", ")}</dd>
                </DetailInformationKeyValueWrapper>
                <DetailInformationKeyValueWrapper>
                  <dt>Currencies</dt>
                  <dd>
                    {data?.currencies
                      ?.map((c) => `${c.name} (${c.symbol})`)
                      .join(", ")}
                  </dd>
                </DetailInformationKeyValueWrapper>
                <DetailInformationKeyValueWrapper>
                  <dt>Languages</dt>
                  <dd>{data?.languages?.join(", ")}</dd>
                </DetailInformationKeyValueWrapper>
              </dl>
            </DetailInformationWrapper>
            <BorderCountriesWraper>
              <span>Border Countries</span>
              <ul>
                {data?.borders?.map((border, idx) => (
                  <BorderCountryItem key={idx}>
                    <span>{border.commonName}</span>
                    <ReactRouterLink to={`/countries/${border.cca3}`} />
                  </BorderCountryItem>
                ))}
              </ul>
            </BorderCountriesWraper>
          </InformationWrapper>
        </MainWrapper>
      )}
    </>
  );
}
