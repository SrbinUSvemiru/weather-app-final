export const API = "0974d184cb2d8d0c23bc45b4780d0025";

export function offsetDate(offset) {
  var d = new Date(new Date().getTime() + offset * 1000);
  var hrs = d.getUTCHours();
  var mins = d.getUTCMinutes();
  var secs = d.getUTCSeconds();

  return [hrs, mins, secs];
}

export function returnDate(offset) {
  var d = new Date(new Date().getTime() + offset * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = d.getUTCDay();
  var dayOfMonth = d.getUTCDate();
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth() + 1;

  return [year, month, dayOfMonth, days[day]];
}

export function returnDay(dt, offset) {
  var d = new Date(dt * 1000 + offset * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var day = d.getUTCDay();
  var num = day % days.length;

  return days[num];
}

export function returnDays(dt, offset) {
  let array = [];
  var d = new Date(dt * 1000 + offset * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = d.getUTCDay();
  let firstHalf = days.slice(day, days.length);
  let secondHalf = days.slice(0, day);
  firstHalf.map((element) => array.push(element));
  secondHalf.map((element) => array.push(element));
  array.push(days[day]);

  return array;
}

export function capitalizeFirstLetter(string) {
  let newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString;
}

export function nextFourtyEightHours(offset) {
  let d = new Date(new Date().getTime() + offset * 1000);

  let currentHour = d.getUTCHours();
  let hours = [];
  for (let i = 0; i < 48; i++) {
    if (currentHour >= 48) {
      const newValue = currentHour - 48;
      hours.push(newValue);
    } else if (currentHour > 23) {
      const newValue = currentHour - 24;
      hours.push(newValue);
    } else {
      hours.push(currentHour);
    }
    currentHour = currentHour + 1;
  }
  let array = hours.filter((element, index) => {
    return index % 3 === 0;
  });
  return array;
}

export function uvIndex(index) {
  const colors = [
    {
      background: "rgb(149,242,94)",
      backgroundTwo:
        "radial-gradient(circle, rgba(149,242,94,0.8326681014202556) 0%, rgba(94,242,143,0.6758053563222164) 49%, rgba(111,216,252,0.1491947120645133) 100%)",
    },
    {
      background: "rgb(252,205,98)",
      backgroundTwo:
        "radial-gradient(circle, rgba(252,205,98,1) 0%, rgba(252,205,98,0.6057773451177346) 49%, rgba(149,242,94,1) 100%)",
    },
    {
      background: "rgb(230,106,102)",
      backgroundTwo:
        "radial-gradient(circle, rgba(230,106,102,1) 0%, rgba(230,106,102,0.6085784655659139) 49%, rgba(252,205,98,0.434908997778799) 100%)",
    },
    {
      background: "rgb(227,25,19)",
      backgroundTwo:
        "radial-gradient(circle, rgba(227,25,19,0.9671218829328606) 0%, rgba(230,106,102,0.6225840678068102) 49%, rgba(230,106,102,0.5805672610841212) 100%)",
    },
    {
      background: "rgb(129,96,247)",
      backgroundTwo:
        "radial-gradient(circle, rgba(129,96,247,1) 0%, rgba(129,96,247,0.5917717428768383) 49%, rgba(227,25,19,0.4096989137451855) 100%)",
    },
  ];

  const description = ["low", "moderate", "high", "very high", "extreme"];
  const message = [
    "You can safely enjoy being outside!",
    "Seek shade during midday hours. ",
    "Avoid being outside during midday! ",
  ];

  if (index < 3) {
    let array = [colors[0], description[0], message[0]];
    return array;
  } else if (index < 6) {
    let array = [colors[1], description[1], message[1]];
    return array;
  } else if (index < 8) {
    let array = [colors[2], description[2], message[1]];
    return array;
  } else if (index < 10) {
    let array = [colors[3], description[3], message[2]];
    return array;
  } else {
    let array = [colors[4], description[4], message[2]];
    return array;
  }
}

export const Images = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
];

export function getCurrentLocation(list) {
  const geolocationAPI = navigator.geolocation;
  geolocationAPI.getCurrentPosition((position) => {
    let lat = position.coords.latitude.toString().slice(0, 4);
    let lng = position.coords.longitude.toString().slice(0, 4);

    let firstFilter = list.filter((city) => {
      return city.lat.toString().slice(0, 4) === lat;
    });
    let secondFilter = firstFilter.filter((city) => {
      return city.lng.toString().slice(0, 4) === lng;
    });

    return secondFilter;
  });
}
