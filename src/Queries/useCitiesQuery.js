import { useQuery } from "react-query";
import { API } from "../Utils/utils";
import { useQueryClient } from "react-query";

export const useGetFetchedQuery = (name) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(name);
};

export const useCitiesQuery = (onSuccess, citie) => {
  return useQuery(`${citie}`, () => getData(citie), {
    onSuccess,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

async function getData(citie) {
  const firstFetch = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${citie}&limit=1&appid=${API}`
  );
  const result = await firstFetch.json();

  let cityName = await result[0].name;
  let country = await result[0].country;

  const secondFetch = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${result[0].lat}&lon=${result[0].lon}&units=metric&appid=${API}`
  );
  const response = await secondFetch.json();

  return { ...response, cityName: [cityName], country: [country] };
}
