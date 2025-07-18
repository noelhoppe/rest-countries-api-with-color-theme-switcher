// --- EXTERN IMPORTS ---
import { useQuery } from "@tanstack/react-query";

// --- INTERN IMPORTS ---
import { fetchCountriesAll } from "../Home.queries";
import { mapToCountryCardProps } from "../utils";

export const QUERY_KEY_COUNTRIES_ALL = ["fetchCountriesAll"];

export default function useGeneralCountriesInformation() {
  const {isPending, isError, data, error } = useQuery({
    queryKey: QUERY_KEY_COUNTRIES_ALL,
    queryFn: async() => {
      const response = await fetchCountriesAll();
      return mapToCountryCardProps(response);
    }
  });
  return {
    isPending,
    isError,
    data,
    error,
  };
}

