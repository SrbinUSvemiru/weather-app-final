import React from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { Window, Wrapper } from "./styled-components";
import { useSpring } from "react-spring";

function CurrentInfoWindow(props) {
  const data = useGetFetchedQuery(props.currentCity);

  const activeWrapperPop = useSpring({
    from: { opacity: 0 },
    to: { opacity: props.activeWrapper === "pop" ? 1 : 0 },
  });

  const activeWrapperWind = useSpring({
    from: { opacity: 0 },
    to: { opacity: props.activeWrapper === "wind" ? 1 : 0 },
  });

  const activeWrapperVisibility = useSpring({
    from: { opacity: 0 },
    to: { opacity: props.activeWrapper === "visibility" ? 1 : 0 },
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
