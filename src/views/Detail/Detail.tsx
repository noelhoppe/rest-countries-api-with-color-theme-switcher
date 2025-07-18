import styled from "styled-components";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchCountryByCode from "./Detail.queries";
import type { CountryDetailViewProps, DetailCountryInformation } from "./Detail.types";
import { mapToDetailCountryInformation } from "./utils";
import { useEffect } from "react";
import type { CountryCardProps } from "../Home/Home.types";

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

type UseDetailCountryInformationResult = {
  isPending: boolean;
  isError: boolean;
  data: CountryDetailViewProps | undefined;
  error: Error | null;
};


function useDetailCountryInformation(cca3: string): UseDetailCountryInformationResult {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["fetchCountryByCode", cca3],
    queryFn: async(): Promise<DetailCountryInformation> => {
      const country = await fetchCountryByCode(cca3);
      return mapToDetailCountryInformation(country);
    }
  })

  const queryClient = useQueryClient();
  const cachedData: CountryCardProps[] | undefined = queryClient.getQueryData(["fetchCountriesAll"]);

  useEffect(() => {
    if (data && cachedData) {
      queryClient.setQueryData(["combinedCountryInformation", cca3], {
        ...data,
        ...cachedData?.find((c) => c.cca3 === cca3),
      });
    }
  }, [data, cachedData, cca3, queryClient]);
  
  const { data: combinedData } = useQuery({
    queryKey: ["combinedCountryInformation", cca3],
    queryFn: () =>
      queryClient.getQueryData(["combinedCountryInformation", cca3]),
    enabled: Boolean(data) && Boolean(cachedData),
  });

  return {
    isPending,
    isError,
    data: combinedData,
    error,
  };
}



export default function Detail() {
  // useParams returns an object with the URL paramters (e.g. { "cca3": "DEU" } )
  const { cca3 } = useParams();
  if (cca3 === undefined) {
    console.log("URL paramter cca3 not found.");
  } else {
    console.log(`URL paramter cca3 found: ${cca3}`);
  }

  const { isPending, isError, data, error } = useDetailCountryInformation(cca3!);

  if (isError) {
    console.log("Error fetching country data:", error);
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
      <MainWrapper>
        <DetailImage
          src={data?.flag}
          alt={data?.flagAlt}
        />
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
                <dd>{data?.currencies?.map((c) => `${c.symbol} ${c.name}`).join(", ")}</dd>
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
                <li key={idx}>{border}</li>
              ))}
            </ul>
          </BorderCountriesWraper>
        </InformationWrapper>
      </MainWrapper>
    </>
  );
}
