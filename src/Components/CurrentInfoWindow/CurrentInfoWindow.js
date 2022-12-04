import React from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { Window, Wrapper } from "./styled-components";
import { useSpring } from "react-spring";

function CurrentInfoWindow(props) {
  const data = useGetFetchedQuery(props.currentCity);

  const activeWrapperPop = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "pop" ? 0.7 : 0,
      scale: props.activeWrapper === "pop" ? "100%" : "0%",
      backgroundImage:
        "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
    },
  });

  const activeWrapperWind = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "wind" ? 0.5 : 0,
      scale: props.activeWrapper === "wind" ? "100%" : "0%",
      backgroundImage:
        "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)",
    },
  });

  const activeWrapperVisibility = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeWrapper === "visibility" ? 0.8 : 0,
      scale: props.activeWrapper === "visibility" ? "100%" : "0%",
      backgroundImage:
        "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);",
    },
  });

  return (
    <>
      <Window
        style={{
          ...props.animation,
          transform: props.animation.x.to((x) => `scale(${x})`),
        }}
        onClick={() => props.setActiveWrapper("wind")}
      >
        <Wrapper style={activeWrapperWind} />
        <div className="card">
          <img src="../wind.png" />
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
        onClick={() => props.setActiveWrapper("pop")}
      >
        <Wrapper style={activeWrapperPop} />
        <div className="card">
          <img src="../wet.png" />
          <p id="speed">{data.daily[0].pop * 100}%</p>
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
        <div className="card">
          <img src="../visibility.png" />
          <p id="speed">
            {Math.round((data.current.visibility / 1000) * 10) / 10}
            km
          </p>
        </div>
      </Window>
    </>
  );
}

export default CurrentInfoWindow;
