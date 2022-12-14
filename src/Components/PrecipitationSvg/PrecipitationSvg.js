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

function PrecipitationSvg(props) {
  const [precipitation, setPrecipitation] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    switch (props.clicked) {
      case "hourly":
        setPrecipitation(() => {
          let values = data.hourly.map((element, index) => element.pop * 20);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          return { pop: values, list: array };
        });

        break;
      case "daily":
        setPrecipitation(() => {
          let values = data.daily.map((element, index) => element.pop * 20);
          let array = data.daily.map((element, index) => element.pop * 20);
          return { pop: values, list: array };
        });
        break;
      default:
        setPrecipitation(() => {
          let values = data.hourly.map((element, index) => element.pop * 20);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          return { pop: values, list: array };
        });
    }
  }, [data, props.clicked]);

  const animation = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: props.activeWrapper === "precipitation" ? 1 : 0,
    },
  });

  if (precipitation)
    return (
      <Container style={animation}>
        <svg width="700" height="120" xmlns="http://www.w3.org/2000/svg">
          <NaturalCurve
            data={precipitation.pop.map((temp, index) => [
              index * (700 / (precipitation.pop.length - 1)),
              -temp * 2 +
                60 +
                (precipitation.pop.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                ) /
                  (precipitation.pop.length - 1)) *
                  2 +
                3,
            ])}
            strokeOpacity={0.9}
            showPoints={false}
            strokeWidth={3}
            stroke="#29ffc6"
          />
        </svg>
        <div className="container-for">
          {precipitation.list.map((element, index) => (
            <NumbersContainer>
              <ValueContainer
                sumOfTemp={
                  -element * 2 +
                  60 +
                  (precipitation.pop.reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  ) /
                    (precipitation.pop.length - 1)) *
                    2 +
                  3
                }
              >
                {Math.round(element * 5)}
                <span>%</span>
              </ValueContainer>
            </NumbersContainer>
          ))}
        </div>
      </Container>
    );
}

export default PrecipitationSvg;
