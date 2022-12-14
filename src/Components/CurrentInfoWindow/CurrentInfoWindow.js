import React from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { Window, Wrapper, Row } from "./styled-components";
import { useSpring } from "react-spring";

function CurrentInfoWindow(props) {
  const data = useGetFetchedQuery(props.currentCity);

  const activeWrapperPop = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "precipitation" ? 0.7 : 0,
      scale: props.activeWrapper === "precipitation" ? "100%" : "0%",
      background: "linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)",
    },
  });

  const activeWrapperWind = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "wind" ? 0.8 : 0,
      scale: props.activeWrapper === "wind" ? "100%" : "0%",
      background: "linear-gradient(to right, #ee9ca7, #ffdde1)",
    },
  });

  const activeWrapperVisibility = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "visibility" ? 0.8 : 0,
      scale: props.activeWrapper === "visibility" ? "100%" : "0%",
      background: "linear-gradient(to right, #2193b0, #6dd5ed)",
    },
  });

  return (
    <Row>
      <Window
        style={{
          ...props.animation,
          transform: props.animation.x.to((x) => `scale(${x})`),
        }}
        onClick={() => props.setActiveWrapper("wind")}
      >
        <Wrapper style={activeWrapperWind} />
        <div className="card" title="Wind">
          <img src="../wind.svg" />
          <p id="speed">
            {Math.round(data.current.wind_speed * 3.5)}
            km/h
          </p>
        </div>
      </Window>

      <Window
        style={{
          ...props.animation,
          transform: props.animation.x.to((x) => `scale(${x})`),
        }}
        onClick={() => props.setActiveWrapper("precipitation")}
      >
        <Wrapper style={activeWrapperPop} />
        <div className="card" title="Precipitation">
          <img src="../umbrella.svg" />
          <p id="speed">{Math.round(data.hourly[0].pop) * 100}%</p>
        </div>
      </Window>

      <Window
        style={{
          ...props.animation,
          transform: props.animation.x.to((x) => `scale(${x})`),
        }}
        onClick={() => props.setActiveWrapper("visibility")}
        value="visibility"
      >
        <Wrapper style={activeWrapperVisibility} />
        <div className="card" title="Humidity">
          <img src="../humidity.svg" />
          <p id="speed">{data.current.humidity}%</p>
        </div>
      </Window>
    </Row>
  );
}

export default CurrentInfoWindow;
