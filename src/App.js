import React, { useEffect, useMemo, useState } from "react";
import {
  useTransition,
  animated,
  config,
  useSpring,
  useChain,
  useSpringRef,
  useTrail,
} from "react-spring";
import { Carousel, Detailed, Item } from "./styled-components";
import "./App.css";
import City from "./Components/City";
import SearchBar from "./Components/SearchBar";
import Expanded from "./Components/Expanded/Expanded";
import { Images, API } from "./Utils/utils";
import DetailedSvg from "./Components/GraphWindow/GraphWindow";

function App() {
  const [open, setOpen] = useState(true);
  const [currentCity, setCurrentCity] = useState();
  const [position, setPosition] = useState(0);

  const [cities, setCities] = useState([
    {
      country: "RS",
      lat: 44.8178131,
      lng: 20.4568974,
      name: "Belgrade",
    },
  ]);

  useEffect(() => {
    console.log(cities);
  });

  const { x, ...style } = useSpring({
    config: { mass: 7, tension: 5000, friction: 200 },
    delay: !open ? 300 : 0,
    from: { opacity: 0, x: 0 },
    to: {
      opacity: !open ? 1 : 0,
      x: !open ? 1 : 0,
    },
  });

  const trail = useTrail(cities.length, {
    config: { mass: 2, tension: 2000, friction: 150 },
    from: { opacity: 0, x: 0 },
    to: {
      opacity: open ? 1 : 0,
      x: open ? 1 : 0,
    },
  });

  const backgroundTransition = useTransition(position, {
    key: position,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 2000 },
  });

  return (
    <div className="App">
      {backgroundTransition((style, index) => (
        <Carousel
          style={{
            ...style,
            backgroundImage: `url(../images/${Images[3]}.jpg)`,
          }}
        />
      ))}

      <SearchBar setCities={setCities} cities={cities} />

      <Detailed>
        <Expanded
          animation={{ ...style, x }}
          setOpen={setOpen}
          open={open}
          currentCity={currentCity}
        />
      </Detailed>
      <div className="con">
        {trail.map(({ x, ...style }, index) => (
          <Item
            key={cities[index].name}
            style={{ ...style, transform: x.to((x) => `scale(${x})`) }}
            onClick={() => setOpen(!open)}
          >
            <City city={cities[index]} setCurrentCity={setCurrentCity} />
          </Item>
        ))}
      </div>
    </div>
  );
}

export default App;
