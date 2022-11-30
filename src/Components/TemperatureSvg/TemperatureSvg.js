import React, { useState, useEffect, useMemo } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { NaturalCurve } from "react-svg-curve";
import {
  NumbersContainer,
  Container,
  ValueContainer,
  TemperatureTile,
} from "./styled-components";

function TemperatureSvg(props) {
  const [temperature, setTemperature] = useState();
  const [tempValues, setTempValues] = useState();

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

  if (temperature)
    return (
      <Container>
        <svg width="700" height="120" xmlns="http://www.w3.org/2000/svg">
          <NaturalCurve
            data={temperature.temperatureDay.map((temp, index) => [
              index * (700 / (temperature.temperatureDay.length - 1)),
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
            strokeOpacity={0.3}
            showPoints={false}
            strokeWidth={3}
            stroke="white"
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
                {Math.round(element * 10) / 10}
              </ValueContainer>
            </NumbersContainer>
          ))}
        </div>
      </Container>
    );
}

export default TemperatureSvg;
