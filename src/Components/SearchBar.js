import React, { useState, useEffect } from "react";
import { useTransition, animated, easings } from "react-spring";
import Data from "../Utils/citiesList.json";
import "../index.css";

function SearchBar({ setCities, cities }) {
  const [cityName, setCityName] = useState("");
  const [searchCities, setSearchCities] = useState();

  useEffect(() => {
    const list = Data.filter((post) => {
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

  const handleClick = (e) => {
    setCities([...cities, e.target.value]);
    setSearchCities(undefined);
    const inputField = document.getElementById("search-bar");
    inputField.value = "";
  };

  const transition = useTransition(searchCities, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { easing: easings.easeInOutQuad, duration: 200 },
  });

  return (
    <div className="SearchBar">
      <input
        placeholder="Search Location..."
        onChange={(e) => setCityName(e.target.value)}
        id="search-bar"
      />
      <div className="list">
        {searchCities !== undefined
          ? transition((style, item) => (
              <animated.button
                key={item.name + item.country}
                value={item.name}
                id="list-btn"
                onClick={handleClick}
                style={style}
              >
                {item.name} / {item.country}
              </animated.button>
            ))
          : ""}
      </div>
    </div>
  );
}

export default SearchBar;
