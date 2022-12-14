import React from "react";
import { useEffect, useState } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { MainWeather, Window } from "./styled-components";
import { moonPhase } from "../../Utils/utils";

function DisplayActiveDay(props) {
  const [dayData, setDayData] = useState();
  const [moon, setMoon] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    if (data) {
      setDayData(data.daily[props.activeDay]);
      setMoon(moonPhase(data.daily[props.activeDay].moon_phase));
      setSunrise(() => {
        const d = new Date(
          data.daily[props.activeDay].sunrise * 1000 +
            data.timezone_offset * 1000
        );
        let hrs = d.getUTCHours();
        let mins = d.getUTCMinutes();
        return [hrs, mins];
      });
      setSunset(() => {
        const d = new Date(
          data.daily[props.activeDay].sunset * 1000 +
            data.timezone_offset * 1000
        );
        let hrs = d.getUTCHours();
        let mins = d.getUTCMinutes();
        return [hrs, mins];
      });
    }
  }, [props.activeDay, data]);

  if (dayData)
    return (
      <Window
        style={{
          ...props.animation,
          transform: props.animation.x.to((x) => `scale(${x})`),
        }}
      >
        <MainWeather>
          <div className="row-first">
            <div className="image-container">
              <img src={`../icons/${dayData.weather[0].icon}.svg`} />
            </div>
            <div id="container">
              <div>
                <p>
                  {Math.round(dayData.temp.max * 10) / 10}&#176; /{" "}
                  {Math.round(dayData.temp.min * 10) / 10}
                  &#176;
                </p>
              </div>
            </div>
            <div className="sun">
              <img src="./sunrise.png" />
              <p id="time">
                {`${sunrise[0] <= 9 ? "0" + sunrise[0] : sunrise[0]}:${
                  sunrise[1] <= 9 ? "0" + sunrise[1] : sunrise[1]
                } `}
              </p>
            </div>
            <div className="sun">
              <img src="./sunset.png" />
              <p id="time">
                {`${sunset[0] <= 9 ? "0" + sunset[0] : sunset[0]}:${
                  sunset[1] <= 9 ? "0" + sunset[1] : sunset[1]
                }`}
              </p>
            </div>
          </div>

          <div id="whole">
            <div id="side">
              <div className="row">
                <div id="container">
                  <h4>Wind</h4>
                  <p>{Math.round(dayData.wind_speed * 3.5)}km/h</p>
                </div>
              </div>
              <div className="row">
                <div id="container">
                  <h4>Pressure</h4>
                  <p>{dayData.pressure}mb</p>
                </div>
              </div>
              <div className="row">
                <div id="container">
                  <img src={`./moon-icons/${moon?.src}`} />
                  <p>{moon?.name}</p>
                </div>
              </div>
            </div>
            <div id="side">
              <div className="row">
                <div id="container">
                  <h4>Cloud cover</h4>
                  <p>{dayData.clouds}%</p>
                </div>
              </div>
              <div className="row">
                <div id="container">
                  <h4>Highest UV</h4>
                  <p>
                    {dayData.uvi}
                    uv
                  </p>
                </div>
              </div>
              <div className="row">
                <div id="container">
                  <h4>Dew point</h4>
                  <p>{Math.round(dayData.dew_point * 10) / 10}%</p>
                </div>
              </div>
            </div>
          </div>
        </MainWeather>
      </Window>
    );
}

export default DisplayActiveDay;
