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

function WindSvg(props) {
  const [wind, setWind] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    switch (props.clicked) {
      case "hourly":
        setWind(() => {
          let values = data.hourly.map((element, index) => element.wind_speed);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          let deg = data.hourly
            .map((element, index) => element.wind_deg)
            .filter((element, index) => {
              return index % 3 === 0;
            });
          return { wind: values, degrees: deg, list: array };
        });

        break;
      case "daily":
        setWind(() => {
          let values = data.daily.map((element, index) => element.wind_speed);
          let deg = data.daily.map((element) => element.wind_deg);

          return { wind: values, degrees: deg, list: values };
        });
        break;
      default:
        setWind(() => {
          let values = data.hourly.map((element, index) => element.wind_speed);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          let deg = data.hourly
            .map((element, index) => element.wind_deg)
            .filter((element, index) => {
              return index % 3 === 0;
            });
          return { wind: values, degrees: deg, list: array };
        });
    }
  }, [data, props.clicked]);

  const animation = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: props.activeWrapper === "wind" ? 1 : 0,
    },
  });

  if (wind)
    return (
      <Container style={animation}>
        <svg width="700" height="120" xmlns="http://www.w3.org/2000/svg">
          <NaturalCurve
            data={wind.wind.map((value, index) => [
              index * (700 / (wind.wind.length - 1)),
              -value * 2 +
                60 +
                (wind.wind.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                ) /
                  (wind.wind.length - 1)) *
                  2 +
                3,
            ])}
            strokeOpacity={0.9}
            showPoints={false}
            strokeWidth={3}
            stroke="#ffdde1"
          />
        </svg>
        <div className="container-for">
          {wind.list.map((element, index) => (
            <NumbersContainer>
              <ValueContainer
                sumOfTemp={
                  -element * 2 +
                  60 +
                  (wind.wind.reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  ) /
                    (wind.wind.length - 1)) *
                    2 +
                  3
                }
                degrees={wind.degrees[index]}
              >
                <p>{Math.round(element * 3.6 * 10) / 10}</p>
                <div id="wind-arrow">
                  <img src="../wind-arrow.png" />
                </div>
              </ValueContainer>
            </NumbersContainer>
          ))}
        </div>
      </Container>
    );
}

export default WindSvg;
