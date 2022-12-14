import React, { useEffect, useState } from "react";
import { useSpring, config, animated } from "react-spring";
import { RemoveButton, Tile, Spinner } from "./styled-components";
import { offsetDate } from "../../Utils/utils";
import { useCitiesQuery } from "../../Queries/useCitiesQuery";
import { useQueryClient } from "react-query";

function City(props) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const onSuccess = (data) => {
    console.log(data);
  };

  const { isLoading, data, isError, error } = useCitiesQuery(
    onSuccess,
    props.city
  );

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        const time = offsetDate(data.timezone_offset);
        setHours(time[0]);
        setMinutes(time[1]);
        setSeconds(time[2]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

  const removeCity = (e) => {
    e.stopPropagation();
    let array = props.cities.filter((city, index) => {
      return index !== props.index;
    });
    props.setCities(array);
    localStorage.setItem(
      "cities",
      JSON.stringify(array.map((element) => element))
    );
  };

  if (isLoading) {
    return (
      <Spinner>
        <img src="../loading-spinners.svg" />
      </Spinner>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (data)
    return (
      <>
        <Tile
          onClick={() =>
            props.setCurrentCity(`${data.cityName}/${data.country}`)
          }
        >
          <div id="container">
            <h3>{data.cityName}</h3>
            <p>{Math.round(data.current.temp * 2) / 2} &#176;C</p>
            <RemoveButton onClick={(e) => removeCity(e)}>
              <img src="./close-icon.png" />
            </RemoveButton>
          </div>
          <div className="icon">
            <img src={`../icons/${data.current.weather[0].icon}.svg`} />
          </div>
          <div className="clock">
            <p>{hours <= 9 ? "0" + hours : hours}:</p>
            <p>{minutes <= 9 ? "0" + minutes : minutes}</p>
          </div>
        </Tile>
      </>
    );
}

export default City;
