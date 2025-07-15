import styled from "styled-components";
import { IoMdArrowBack } from "react-icons/io";
import type { CountryDetailViewProps } from "../../types/detail";
import { Link, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchDetailCountryInformation from "../../services/detail";
import { queryClient } from "../../App";
import { useDebugValue, useEffect } from "react";

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

export default function Detail() {
  // useParams returns an object with the URL paramters (e.g. { "cca3": "DEU" } )
  const { cca3 } = useParams(); 
  if (!cca3) {
    console.log("URL paramter cca3 not found.")
  } else {
    console.log(`URL paramter cca3 found: ${cca3}`)
  }


  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["detailCountryInformation", cca3],
  //   queryFn: () => fetchDetailCountryInformation(cca3!),
  // });
  // const queryClient = useQueryClient();
  // const cachedData = queryClient.getQueryData(["generalCountryInformation"]);

  // useEffect(() => {
  //   if (data && cachedData) {
  //     queryClient.setQueryData(["cmobinedCountryInformation", cca3], {
  //       ...cachedData,
  //       ...data,
  //     });
  //   }
  // }, [data, cachedData, cca3, queryClient]);

  // const { data: combinedData } = useQuery({
  //   queryKey: ["combinedCountryInformation", cca3],
  //   queryFn: () =>
  //     queryClient.getQueryData(["combinedCountryInformation", cca3]),
  //   enabled: !!data && !!cachedData,
  // });

  
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
      <MainWrapper>
        <DetailImage
          src="https://flagcdn.com/de.svg"
          alt="The flag of Germany is composed of three equal horizontal bands of black, red and gold."
        />
        <InformationWrapper>
          <DetailTitle>Deutschland</DetailTitle>
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
    </>
  );
}
