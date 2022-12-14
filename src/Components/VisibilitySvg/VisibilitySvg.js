import React, { useState, useEffect } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { NaturalCurve } from "react-svg-curve";
import {
  NumbersContainer,
  Container,
  ValueContainer,
  TemperatureTile,
} from "./styled-components";
import { useSpring } from "react-spring";

function VisibilitySvg(props) {
  const [visibility, setVisibility] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    switch (props.clicked) {
      case "hourly":
        setVisibility(() => {
          let values = data.hourly.map(
            (element, index) => element.humidity / 2
          );
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });

          return { vis: values, list: array };
        });

        break;
      case "daily":
        setVisibility(() => {
          let values = data.daily.map((element, index) => element.humidity / 2);

          return { vis: values, list: values };
        });
        break;
      default:
        setVisibility(() => {
          let values = data.hourly.map(
            (element, index) => element.humidity / 2
          );
          let array = values.filter((element, index) => {
            return index % 3 === 0;
          });

          return { vis: values, list: array };
        });
    }
  }, [data, props.clicked]);

  const animation = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: props.activeWrapper === "visibility" ? 1 : 0,
    },
  });

  if (visibility)
    return (
      <Container style={animation}>
        <svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">
          <NaturalCurve
            data={visibility.vis.map((value, index) => [
              index * (800 / (visibility.vis.length - 1)),
              -value * 2 +
                60 +
                (visibility.vis.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                ) /
                  (visibility.vis.length - 1)) *
                  2 +
                3,
            ])}
            strokeOpacity={0.9}
            showPoints={false}
            strokeWidth={3}
            stroke="#6dd5ed"
          />
        </svg>
        <div className="container-for">
          {visibility.list.map((element, index) => (
            <NumbersContainer>
              <ValueContainer
                sumOfTemp={
                  -element * 2 +
                  60 +
                  (visibility.vis.reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  ) /
                    (visibility.vis.length - 1)) *
                    2 +
                  3
                }
              >
                <p>{element * 2}</p>
              </ValueContainer>
            </NumbersContainer>
          ))}
        </div>
      </Container>
    );
}

export default VisibilitySvg;
