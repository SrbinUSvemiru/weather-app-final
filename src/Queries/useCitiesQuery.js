import { useQuery } from "react-query";
import { API } from "../Utils/utils";
import { useQueryClient } from "react-query";

export const useGetFetchedQuery = (name) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(name);
};

export const useCitiesQuery = (onSuccess, citie) => {
  return useQuery(`${citie.name}/${citie.country}`, () => getData(citie), {
    onSuccess,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

async function getData(citie) {
  const secondFetch = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${citie.lat}&lon=${citie.lng}&units=metric&appid=${API}`
  );
  const response = await secondFetch.json();

  let cityName = citie.name;
  let country = citie.country;

  return { ...response, cityName: cityName, country: country };
}
