import React, { useMemo } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { Window, Uvi, Wrapper } from "./styled-components";
import { uvIndex } from "../../Utils/utils";
import { useSpring } from "react-spring";
function UVWindow(props) {
  const data = useGetFetchedQuery(props?.currentCity);

  const activeWrapper = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props?.activeWrapper === "UV" ? 0.5 : 0,
      scale: props?.activeWrapper === "UV" ? "100%" : "0%",
    },
  });

  const uvIndexCalc = useMemo(() => {
    if (data !== undefined) return uvIndex(data?.current?.uvi);
  }, [data]);
  return (
    <Window
      style={{
        ...props.animation,
        transform: props.animation.x.to((x) => `scale(${x})`),
      }}
      onClick={() => props.setActiveWrapper("UV")}
    >
      <Wrapper style={activeWrapper} />
      <div id="uv-index">
        <div className="row">
          <div>
            <p>{uvIndexCalc[1]}</p>
            <p id="units">{data?.current?.uvi}uv</p>
          </div>
          <div id="message">
            <p>{uvIndexCalc[2]}</p>
          </div>
        </div>
        <div className="row">
          <Uvi color={uvIndexCalc[0]} uvi={data?.current?.uvi}>
            <div id="background"></div>
          </Uvi>
        </div>
      </div>
    </Window>
  );
}

export default UVWindow;
