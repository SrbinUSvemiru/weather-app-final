import React, { useState, useMemo } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { Wrapper, Window, Day } from "./styled-components";
import { animated, useSpring } from "react-spring";
import { returnDay } from "../../Utils/utils";
import { useEffect } from "react";

function DaysList(props) {
  const activeWrapper = useSpring({
    config: { mass: 2, tension: 3000, friction: 150 },
    from: { opacity: 0, scale: "0%" },
    to: {
      opacity: props.activeDay === props.index ? 0.5 : 0,
      scale: props.activeDay === props.index ? "100%" : "0%",
    },
  });

  const day = useMemo(() => {
    if (props.data) {
      let day = returnDay(props.data.dt, props.offset);

      let shortened = day.slice(0, 3);
      return shortened;
    }
  }, [props.data, props.index, props.offset]);

  return (
    <Window
      style={{
        ...props.animation,
        transform: props.animation.x.to((x) => `scale(${x})`),
      }}
      onClick={() => props.setActiveDay(props.index)}
    >
      <Wrapper style={activeWrapper} />
      <Day>
        <p>{day}</p>
        <img src={`../icons/${props.data.weather[0].icon}.svg`} />
      </Day>
    </Window>
  );
}

export default DaysList;
