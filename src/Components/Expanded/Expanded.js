import React, { useState, useEffect } from "react";

import {
  LeftSideContainer,
  RightSideContainer,
  Container,
  Window,
  TopContainer,
  Visibility,
  Moon,
  DaysRow,
  MoonWindow,
} from "./styled-components";

import GraphWindow from "../GraphWindow/GraphWindow";

import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import DaysList from "../DaysList/DaysList";
import DisplayActiveDay from "../DisplayActiveDay/DisplayActiveDay";
import TemperatureWindow from "../TemperatureWindow/TemperatureWindow";
import UVWindow from "../UVWindow/UVWindow";
import CurrentInfoWindow from "../CurrentInfoWindow/CurrentInfoWindow";
import DateAndLocationWindow from "../DateAndLocationWindow/DateAndLocationWindow";
import AlertMessageWindow from "../AlertMessageWindow/AlertMessageWindow";
import { moonPhase } from "../../Utils/utils";

function Expanded(props) {
  const [activeDay, setActiveDay] = useState(0);
  const [activeWrapper, setActiveWrapper] = useState("temperature");
  const [moon, setMoon] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    if (data) setMoon(moonPhase(data.daily[0].moon_phase));
  }, [data]);

  const handleBackClick = () => {
    setActiveDay(0);
    setActiveWrapper("temperature");
    props.setOpen(!props.open);
  };

  if (data)
    return (
      <Container>
        <div id="back-arrow-container">
          <Window
            onClick={() => handleBackClick()}
            style={{
              ...props.animation,
              transform: props.animation.x.to((x) => `scale(${x})`),
            }}
          >
            <img src="../back-arrow.png" />
          </Window>
        </div>

        <TopContainer>
          <LeftSideContainer>
            <div className="row">
              <TemperatureWindow
                currentCity={props.currentCity}
                animation={props.animation}
                setActiveWrapper={setActiveWrapper}
                activeWrapper={activeWrapper}
              />
            </div>
            <div className="row">
              <UVWindow
                currentCity={props.currentCity}
                animation={props.animation}
                setActiveWrapper={setActiveWrapper}
                activeWrapper={activeWrapper}
              />
            </div>
            <div className="row">
              <CurrentInfoWindow
                currentCity={props.currentCity}
                animation={props.animation}
                setActiveWrapper={setActiveWrapper}
                activeWrapper={activeWrapper}
              />
            </div>
          </LeftSideContainer>
          <RightSideContainer>
            <div className="row">
              <MoonWindow
                style={{
                  ...props.animation,
                  transform: props.animation.x.to((x) => `scale(${x})`),
                }}
              >
                <Moon>
                  <div id="moon-img" title={moon?.name}>
                    <img src={`./moon-icons/${moon?.src}`} />
                  </div>
                </Moon>
              </MoonWindow>
              <AlertMessageWindow
                currentCity={props.currentCity}
                animation={props.animation}
              />

              <DateAndLocationWindow
                currentCity={props.currentCity}
                animation={props.animation}
              />
            </div>
            <div className="row">
              <DisplayActiveDay
                activeDay={activeDay}
                currentCity={props.currentCity}
                animation={props.animation}
              />
            </div>
            <DaysRow>
              {data.daily.map((day, index) => (
                <>
                  <DaysList
                    data={day}
                    index={index}
                    offset={data.timezone_offset}
                    activeDay={activeDay}
                    currentCity={props.currentCity}
                    activeWrapper={activeWrapper}
                    animation={props.animation}
                    setActiveDay={setActiveDay}
                  />
                </>
              ))}
            </DaysRow>
          </RightSideContainer>
        </TopContainer>
        <div className="row detailed">
          <GraphWindow
            currentCity={props.currentCity}
            animation={props.animation}
            activeWrapper={activeWrapper}
          />
        </div>
      </Container>
    );
}

export default Expanded;
