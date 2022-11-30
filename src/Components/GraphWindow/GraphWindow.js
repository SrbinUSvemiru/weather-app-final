import React, { useEffect, useState, useMemo } from "react";
import {
  SvgContainer,
  TimeList,
  Container,
  Button,
  Window,
} from "./styled-components";
import { NaturalCurve } from "react-svg-curve";
import { nextFourtyEightHours, returnDays } from "../../Utils/utils";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import TemperatureSvg from "../TemperatureSvg/TemperatureSvg";

function GraphWindow(props) {
  const [clicked, setClicked] = useState();
  const [hoursList, setHoursList] = useState();
  const [daysList, setDaysList] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    setClicked("hourly");
    setHoursList(() => {
      return nextFourtyEightHours(data.timezone_offset).map((hour) => {
        return hour < 10 ? `0${hour}:00` : `${hour}:00`;
      });
    });
    setDaysList(() => {
      return returnDays(data.current.dt, data.timezone_offset);
    });
  }, [data]);

  // const sumOfTemp = useMemo(() => {
  //   if (clicked) {
  //     let sum = clicked.values.reduce(
  //       (previousValue, currentValue) => previousValue + currentValue,
  //       0
  //     );
  //     return sum;
  //   }
  // }, [clicked]);

  // const everyThirdHour = useMemo(() => {
  //   if (clicked) {
  //     if (clicked.values.length > 15) {
  //       return clicked.values.filter((element, index) => {
  //         return index % 3 === 0;
  //       });
  //     } else {
  //       return clicked.values;
  //     }
  //   }
  // }, [clicked]);

  return (
    <Window
      style={{
        ...props.animation,
        transform: props.animation.x.to((x) => `scale(${x})`),
      }}
    >
      <Container>
        <div id="buttons-container">
          <Button onClick={() => setClicked("hourly")}>48 hours</Button>
          <Button onClick={() => setClicked("daily")}>week</Button>
        </div>
        <SvgContainer>
          <div id="svg-container">
            <TemperatureSvg
              currentCity={props.currentCity}
              clicked={clicked}
              hoursList={hoursList}
              daysList={daysList}
            />
          </div>
        </SvgContainer>
        <TimeList>
          {clicked === "hourly"
            ? hoursList?.map((hour) => <div>{hour}</div>)
            : daysList?.map((hour) => <div>{hour}</div>)}
        </TimeList>
      </Container>
    </Window>
  );
}

export default GraphWindow;
