import React, { useState, useEffect, useMemo } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { NaturalCurve } from "react-svg-curve";
import {
  NumbersContainer,
  Container,
  ValueContainer,
  TemperatureTile,
} from "./styled-components";
import { useSpring } from "react-spring";

function TemperatureSvg(props) {
  const [temperature, setTemperature] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    switch (props.clicked) {
      case "hourly":
        setTemperature(() => {
          let values = data.hourly.map((element, index) => element.temp);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          return { temperatureDay: values, list: array };
        });

        break;
      case "daily":
        setTemperature(() => {
          let values = data.daily.map((element, index) => element.temp.day);
          let array = data.daily.map((element, index) => element.temp.day);
          return { temperatureDay: values, list: array };
        });
        break;
      default:
        setTemperature(() => {
          let values = data.hourly.map((element, index) => element.temp);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          return { temperatureDay: values, list: array };
        });
    }
  }, [data, props.clicked]);

  const animation = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: props.activeWrapper === "temperature" ? 1 : 0,
    },
  });

  if (temperature)
    return (
      <Container style={animation}>
        <svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">
          <NaturalCurve
            data={temperature.temperatureDay.map((temp, index) => [
              index * (800 / (temperature.temperatureDay.length - 1)),
              -temp * 2 +
                60 +
                (temperature.temperatureDay.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                ) /
                  (temperature.temperatureDay.length - 1)) *
                  2 +
                3,
            ])}
            strokeOpacity={0.9}
            showPoints={false}
            strokeWidth={3}
            stroke="#f9d423"
          />
        </svg>
        <div className="container-for">
          {temperature.list.map((element, index) => (
            <NumbersContainer>
              <ValueContainer
                sumOfTemp={
                  -element * 2 +
                  60 +
                  (temperature.temperatureDay.reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  ) /
                    (temperature.temperatureDay.length - 1)) *
                    2 +
                  3
                }
              >
                {Math.round(element * 10) / 10}&#176;
              </ValueContainer>
            </NumbersContainer>
          ))}
        </div>
      </Container>
    );
}

export default TemperatureSvg;
