import React, { useState, useEffect } from "react";
import { animated } from "react-spring";
import citiesList from "cities.json";
import { SearchBarContainer } from "./styled-components";
import _ from "lodash";

function SearchBar({ setCities, cities }) {
  const [cityName, setCityName] = useState("");
  const [searchCities, setSearchCities] = useState([]);

  useEffect(() => {
    const list = citiesList.filter((post) => {
      if (!cityName) {
        return "";
      } else {
        return post.name.toLowerCase().startsWith(cityName.toLowerCase());
      }
    });

    const sorted = list.sort(function (a, b) {
      return a.name.length - b.name.length;
    });
    const sliced = sorted.slice(0, 20);

    setSearchCities(sliced);
  }, [cityName, cities]);

  const handleClick = (obj) => {
    if (!cities.find((city) => _.isEqual(obj, city)) && cities.length < 9) {
      setCities([...cities, obj]);
      localStorage.setItem("cities", JSON.stringify([...cities, obj]));
    }

    setSearchCities([]);
    setCityName("");
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      const geolocationAPI = navigator.geolocation;
      geolocationAPI.getCurrentPosition((position) => {
        let lat = position.coords.latitude.toString().slice(0, 4);
        let lng = position.coords.longitude.toString().slice(0, 4);

        let firstFilter = citiesList.filter((city) => {
          return city.lat.toString().slice(0, 4) === lat;
        });
        let secondFilter = firstFilter.filter((city) => {
          return city.lng.toString().slice(0, 4) === lng;
        });

        setSearchCities(secondFilter);
      });
    }
  };

  return (
    <SearchBarContainer searchCities={searchCities}>
      <input
        placeholder="Search Location..."
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}
        id="search-bar"
      />
      <button
        onClick={handleLocationClick}
        id="location-btn"
        title="Current Location"
      >
        <img src="./location-icon.png" />
      </button>

      <div className="list">
        {searchCities.map((citie, index) => (
          <animated.button
            key={citie.name + index}
            value={citie}
            id="list-btn"
            onClick={() => handleClick(citie)}
          >
            {citie.name} <span id="span">{citie.country}</span>
          </animated.button>
        ))}
      </div>
    </SearchBarContainer>
  );
}

export default SearchBar;
