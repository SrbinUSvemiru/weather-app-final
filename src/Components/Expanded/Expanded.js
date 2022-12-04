import React, { useState } from "react";
import { useSpring } from "react-spring";
import {
  LeftSideContainer,
  RightSideContainer,
  Container,
  Window,
  Wrapper,
  DayWindow,
  TopContainer,
} from "./styled-components";
import {
  capitalizeFirstLetter,
  offsetDate,
  returnDate,
  uvIndex,
} from "../../Utils/utils";
import GraphWindow from "../GraphWindow/GraphWindow";
import SunriseSunset from "../SunriseSunset/SunriseSunset";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import DaysList from "../DaysList/DaysList";
import DisplayActiveDay from "../DisplayActiveDay/DisplayActiveDay";
import TemperatureWindow from "../TemperatureWindow/TemperatureWindow";
import UVWindow from "../UVWindow/UVWindow";
import CurrentInfoWindow from "../CurrentInfoWindow/CurrentInfoWindow";
import DateAndLocationWindow from "../DateAndLocationWindow/DateAndLocationWindow";
import { useEffect } from "react";

function Expanded(props) {
  const [activeDay, setActiveDay] = useState(0);
  const [activeWrapper, setActiveWrapper] = useState("temperature");

  const data = useGetFetchedQuery(props.currentCity);

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
              <DateAndLocationWindow
                currentCity={props.currentCity}
                animation={props.animation}
              />
            </div>
            <div className="row">
              <Window
                style={{
                  ...props.animation,
                  transform: props.animation.x.to((x) => `scale(${x})`),
                }}
              >
                <DisplayActiveDay
                  activeDay={activeDay}
                  currentCity={props.currentCity}
                ></DisplayActiveDay>
              </Window>
            </div>
            <div className="row">
              <div id="days-list">
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
              </div>
            </div>
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
