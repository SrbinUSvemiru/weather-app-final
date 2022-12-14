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

function UVSvg(props) {
  const [uv, setUV] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    switch (props.clicked) {
      case "hourly":
        setUV(() => {
          let values = data.hourly.map((element, index) => element.uvi);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          return { uvi: values, list: array };
        });

        break;
      case "daily":
        setUV(() => {
          let values = data.daily.map((element, index) => element.uvi);
          let array = data.daily.map((element, index) => element.uvi);
          return { uvi: values, list: array };
        });
        break;
      default:
        setUV(() => {
          let values = data.hourly.map((element, index) => element.uvi);
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });
          return { uvi: values, list: array };
        });
    }
  }, [data, props.clicked]);

  const animation = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: props.activeWrapper === "UV" ? 1 : 0,
    },
  });

  if (uv)
    return (
      <Container style={animation}>
        <svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">
          <NaturalCurve
            data={uv.uvi.map((temp, index) => [
              index * (800 / (uv.uvi.length - 1)),
              -temp * 2 +
                60 +
                (uv.uvi.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                ) /
                  (uv.uvi.length - 1)) *
                  2 +
                3,
            ])}
            strokeOpacity={0.8}
            showPoints={false}
            strokeWidth={3}
            stroke="#9b23ea"
          />
        </svg>
        <div className="container-for">
          {uv.list.map((element, index) => (
            <NumbersContainer>
              <ValueContainer
                sumOfTemp={
                  -element * 2 +
                  60 +
                  (uv.uvi.reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  ) /
                    (uv.uvi.length - 1)) *
                    2 +
                  3
                }
              >
                {element}
              </ValueContainer>
            </NumbersContainer>
          ))}
        </div>
      </Container>
    );
}

export default UVSvg;
