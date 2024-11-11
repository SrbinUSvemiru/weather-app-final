import React, { useEffect, useState, useMemo } from "react";
import {
  SvgContainer,
  TimeList,
  Container,
  ButtonHourly,
  ButtonDaily,
  Window,
} from "./styled-components";
import { nextFourtyEightHours, returnDays } from "../../Utils/utils";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import TemperatureSvg from "../TemperatureSvg/TemperatureSvg";
import WindSvg from "../WindSvg/WindSvg";
import UVSvg from "../UVSvg/UVSvg";
import PrecipitationSvg from "../PrecipitationSvg/PrecipitationSvg";
import VisibilitySvg from "../VisibilitySvg/VisibilitySvg";

function GraphWindow(props) {
  const [clicked, setClicked] = useState("hourly");
  const [hoursList, setHoursList] = useState();
  const [daysList, setDaysList] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    setHoursList(() => {
      return nextFourtyEightHours(data.timezone_offset).map((hour) => {
        return hour < 10 ? `0${hour}:00` : `${hour}:00`;
      });
    });
    setDaysList(() => {
      return returnDays(data?.current?.dt, data?.timezone_offset);
    });
    setClicked("hourly");
  }, [data]);

  return (
    <Window
      style={{
        ...props.animation,
        transform: props.animation.x.to((x) => `scale(${x})`),
      }}
    >
      <Container>
        <div id="buttons-container">
          <ButtonHourly onClick={() => setClicked("hourly")} value={clicked}>
            48 hours
          </ButtonHourly>
          <ButtonDaily onClick={() => setClicked("daily")} value={clicked}>
            7 days
          </ButtonDaily>
        </div>
        <SvgContainer>
          <TemperatureSvg
            currentCity={props.currentCity}
            clicked={clicked}
            hoursList={hoursList}
            daysList={daysList}
            activeWrapper={props.activeWrapper}
          />
          <WindSvg
            currentCity={props.currentCity}
            clicked={clicked}
            hoursList={hoursList}
            daysList={daysList}
            activeWrapper={props.activeWrapper}
          />
          <UVSvg
            currentCity={props.currentCity}
            clicked={clicked}
            hoursList={hoursList}
            daysList={daysList}
            activeWrapper={props.activeWrapper}
          />
          <PrecipitationSvg
            currentCity={props.currentCity}
            clicked={clicked}
            hoursList={hoursList}
            daysList={daysList}
            activeWrapper={props.activeWrapper}
          />
          <VisibilitySvg
            currentCity={props.currentCity}
            clicked={clicked}
            hoursList={hoursList}
            daysList={daysList}
            activeWrapper={props.activeWrapper}
          />
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
