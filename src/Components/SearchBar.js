import React, { useState, useEffect } from "react";
import { animated } from "react-spring";
import { API } from "../Utils/utils";
import citiesList from "cities.json";
function SearchBar({ setCities, cities }) {
  const [cityName, setCityName] = useState("");
  const [searchCities, setSearchCities] = useState(undefined);

  useEffect(() => {
    const list = citiesList.filter((post) => {
      if (cityName === "") {
        return "";
      } else if (post.name.toLowerCase().includes(cityName.toLowerCase())) {
        for (let i = 0; i < cityName.length; i++) {
          if (
            cityName.toLowerCase().charAt(i) ===
              post.name.toLowerCase().charAt(i) &&
            cityName.length === post.name.length
          ) {
            return post;
          } else if (
            cityName.toLowerCase().charAt(i) ===
            post.name.toLowerCase().charAt(i)
          ) {
            return post;
          } else {
            return "";
          }
        }
      }
    });

    const sliced = list.slice(0, 20);

    setSearchCities(sliced);
  }, [cityName]);

  const handleClick = (obj) => {
    setCities([...cities, obj]);
    setSearchCities(undefined);
    const inputField = document.getElementById("search-bar");
    inputField.value = "";
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Search Location..."
        onChange={(e) => setCityName(e.target.value)}
        id="search-bar"
      />
      <div className="list">
        {searchCities === undefined
          ? ""
          : searchCities.map((citie, index) => (
              <animated.button
                key={citie.name + index}
                value={citie}
                id="list-btn"
                onClick={() => handleClick(citie)}
              >
                {`${citie.name} / ${citie.country}`}
              </animated.button>
            ))}
      </div>
    </div>
  );
}

export default SearchBar;
