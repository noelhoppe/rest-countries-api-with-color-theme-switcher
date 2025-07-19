// --- EXTERN IMPORTS ---
import { useQuery, useQueryClient } from "@tanstack/react-query";

// --- INTERN IMPORTS ---
import type { 
  CountryDetailViewProps, 
  DetailCountryInformation 
} from "../Detail.types";
import fetchCountryByCode from "../Detail.queries";
import { mapToDetailCountryInformation } from "../utils";
import { useEffect } from "react";
import useGeneralCountriesInformation from "../../Home/hooks/useGeneralCountriesInformation";


export default function useDetailCountryInformation(cca3: string) {
  const { isPending: isCountriesPending, isError: isCountriesError, data: countriesData, error: countriesError } = useGeneralCountriesInformation();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["fetchCountryByCode", cca3],
    queryFn: async (): Promise<DetailCountryInformation> => {
      const country = await fetchCountryByCode(cca3);
      return mapToDetailCountryInformation(country);
    }
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && countriesData) {
      queryClient.setQueryData(["combinedCountryInformation", cca3], {
        ...countriesData.find((c) => c.cca3 === cca3),
        ...data,
        borders: data.borders.map((border) => {
          const borderCountryCommonNamen = countriesData.find((c) => c.cca3 === border)?.commonName;
          return {
            cca3: border,
            commonName: borderCountryCommonNamen || cca3,
          }
        })
      });
    }
  }, [data, countriesData, cca3, queryClient]);

  const { data: combinedData } = useQuery({
    queryKey: ["combinedCountryInformation", cca3],
    queryFn: (): CountryDetailViewProps | undefined =>
      queryClient.getQueryData(["combinedCountryInformation", cca3]),
    enabled: Boolean(data) && Boolean(countriesData),
  });

  return {
    isPending: isPending || isCountriesPending,
    isError: isError || isCountriesError,
    data: combinedData,
    error: error || countriesError,
  };
}