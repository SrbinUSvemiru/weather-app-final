import React, { useState, useEffect, useMemo } from "react";
import { animated, useSpring } from "react-spring";
import { Circle, Container } from "./styled-components";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";

function SunriseSunset(props) {
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [sunriseTomorrow, setSunriseTomorrow] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    if (data) {
      setSunrise(() => {
        const d = new Date(
          data.current.sunrise * 1000 + data.timezone_offset * 1000
        );
        let hrs = d.getUTCHours();
        let mins = d.getUTCMinutes();
        return [hrs, mins];
      });
      setSunset(() => {
        const d = new Date(
          data.current.sunset * 1000 + data.timezone_offset * 1000
        );
        let hrs = d.getUTCHours();
        let mins = d.getUTCMinutes();
        return [hrs, mins];
      });
      setSunriseTomorrow(() => {
        let d = new Date(
          data.daily[1].sunrise * 1000 + data.timezone_offset * 1000
        );
        let hrs = d.getUTCHours();
        let mins = d.getUTCMinutes();
        return [hrs, mins];
      });
    }
  }, [data]);

  const isDayTime = useMemo(() => {
    if (sunrise && sunset) {
      let sunriseMinutes = sunrise[0] * 60 + sunrise[1];
      let sunsetMinutes = sunset[0] * 60 + sunset[1];
      let currentTime = props.hours * 60 + props.minutes;
      if (sunriseMinutes < currentTime && currentTime < sunsetMinutes) {
        return true;
      } else {
        return false;
      }
    }
  }, [sunrise, sunset, props.hours, props.minutes]);

  const calculation = useMemo(() => {
    if (sunrise && sunset) {
      let r = 50;
      let circumference = 2 * r * 3.14;
      let radians = circumference / r;
      let currentTime = props.hours * 60 + props.minutes;
      if (isDayTime) {
        let dayDurationInMinutes =
          sunset[0] * 60 + sunset[1] - (sunrise[0] * 60 + sunrise[1]);
        let radiansMinutes = radians * 24 * 60;

        let result = (radiansMinutes - currentTime) / (24 * 60);
        return result;
      } else {
        let nightDurationInMinutes =
          24 * 60 -
          (sunset[0] * 60 + sunset[1]) -
          (sunrise[0] * 60 + sunrise[1]);
        let radiansMinutes = radians * nightDurationInMinutes;
        let result =
          (radiansMinutes - currentTime) / nightDurationInMinutes / 2;
        return result;
      }
    }
  }, [props.hours, props.minutes, sunrise, sunset, isDayTime]);

  const translate = useSpring({
    config: { mass: 10, tension: 2000, friction: 150 },
    from: { x: 0 },
    to: { x: calculation },
  });

  if (sunrise && sunset && data)
    return (
      <Container>
        <div className="rows ">
          <Circle calculation={calculation} isDayTime={isDayTime}></Circle>
        </div>
        <div className="rows">
          <img src="../sunrise.png" />
          <img src="../sunset.png" />
        </div>
        <div className="rows" id="border">
          <p id="title">Sunrise</p>
          <p id="title">Sunset</p>
        </div>
        <div className="rows">
          <p id="time">{`${sunrise[0] <= 9 ? "0" + sunrise[0] : sunrise[0]}:${
            sunrise[1] <= 9 ? "0" + sunrise[1] : sunrise[1]
          } `}</p>
          <p id="time">{`${sunset[0] <= 9 ? "0" + sunset[0] : sunset[0]}:${
            sunset[1] <= 9 ? "0" + sunset[1] : sunset[1]
          }`}</p>
        </div>
      </Container>
    );
}

export default SunriseSunset;
