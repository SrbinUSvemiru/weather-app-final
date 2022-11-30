import React, { useState, useEffect } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { Window, Wrapper } from "./styled-components";
import { useSpring } from "react-spring";

function TemperatureWindow(props) {
  const data = useGetFetchedQuery(props.currentCity);

  const activeWrapper = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "temperature" ? 1 : 0,
      scale: props.activeWrapper === "temperature" ? "100%" : "0%",
    },
  });

  return (
    <Window
      style={{
        ...props.animation,
        transform: props.animation.x.to((x) => `scale(${x})`),
      }}
      onClick={() => props.setActiveWrapper("temperature")}
    >
      <Wrapper style={activeWrapper} />
      <div className="row">
        <div id="icon-container">
          <img
            src={`../icons/${data.current.weather[0].icon}.svg`}
            id="main-svg"
          />
          <div id="description">
            <p>{data.current.weather[0].description}</p>
          </div>
        </div>
        <div className="temp-con">
          <div className="container">
            <h1>{Math.round((data.current.temp * 2) / 2)}</h1>
            <div>
              <p id="degrees">&#176;</p>
              <p id="degrees">c</p>
            </div>
          </div>
          <p id="feels-like">
            Feels like: {Math.round(data.current.feels_like * 10) / 10}
            &#176;
          </p>
        </div>
      </div>
    </Window>
  );
}

export default TemperatureWindow;
