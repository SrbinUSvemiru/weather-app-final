import React from "react";
import { useEffect, useState } from "react";
import { useGetFetchedQuery } from "../../Queries/useCitiesQuery";
import { MainWeather } from "./styled-components";

function DisplayActiveDay(props) {
  const [dayData, setDayData] = useState();

  const data = useGetFetchedQuery(props.currentCity);

  useEffect(() => {
    if (data) setDayData(data.daily[props.activeDay]);
  }, [props.activeDay, data]);

  if (dayData)
    return (
      <>
        <MainWeather>
          <div className="row">
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
                  <h4>Humidity</h4>
                  <p>{dayData.humidity}%</p>
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
      </>
    );
}

export default DisplayActiveDay;
