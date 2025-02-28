import { clamp, concat, join } from 'lodash';
import { DateTime } from 'luxon';

export const getUnits = ({ selected, units = '' }) => {
	const obj = {
		temperature: { metric: 'C', imperial: 'F' },
		wind: { metric: 'km/h', imperial: 'mph' },
		distance: { metric: 'km', imperial: 'mi' },
		precipitation: { metric: '%', imperial: '%' },
		humidity: { metric: '%', imperial: '%' },
	};

	return obj[selected][units];
};

function mapTempToPercentage(temp) {
	const tempMin = 7;
	const tempMax = -30;
	const targetMin = 170;
	const targetMax = 200;

	// Calculate percentage between 7 and -100
	const percentage = (temp - tempMin) / (tempMax - tempMin);

	// Map the percentage to the range [170, 240]
	const mappedValue = targetMin + percentage * (targetMax - targetMin);

	return clamp(Math.round(mappedValue), 170, 200);
}

export const getTemperatureColor = ({ temp }) => {
	const luminance = temp > 0 ? 80 - temp : clamp(80 - Math.abs(temp), 50, 80);
	const hue = mapTempToPercentage(temp);

	const saturation = 90;
	if (temp < 7) {
		return `-webkit-linear-gradient(90deg, hsl(${hue - 20}, ${saturation}%, ${50}%), hsl(${hue}, ${saturation}%, ${50}%)  90%)`;
	}
	return `-webkit-linear-gradient(90deg, hsl(58, ${saturation}%, ${luminance}%), hsl(13, ${saturation}%, ${luminance}%)  150%)`;
};

const getNestedValue = (obj, path) => path.split('.').reduce((acc, key) => acc && acc[key], obj);

export const getMinMax = (arr, field, minOrMax) =>
	arr.reduce(
		(acc, curr) => {
			const value = getNestedValue(curr, field);
			return minOrMax === 'min' ? Math.min(acc, value) : Math.max(acc, value);
		},
		minOrMax === 'min' ? Infinity : -Infinity,
	);

export function getDate({ timezone = 0 }) {
	const utcNow = DateTime.utc();

	const cityTime = utcNow.plus({ seconds: timezone });
	const formattedDate = cityTime.toFormat('cccc, LLLL d, yyyy');

	return formattedDate;
}

export function getTime({ timezone = 0, formatt = 'HH:mm:ss', dt = 0, local = false }) {
	const utcNow = dt !== 0 ? DateTime.fromMillis(dt * 1000).toUTC() : DateTime.utc();

	const cityTime = local ? DateTime.local() : utcNow.plus({ seconds: timezone });
	const formattedTime = cityTime.toFormat(formatt);

	return formattedTime;
}

export const getBackgroundUrls = () => ({
	light: [
		'https://images.unsplash.com/photo-1645421025282-8d27db73dab8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1561486576-189f808ca324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1446729444801-31245ddba81a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1441039995991-e5c1178e605a?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	],
	dark: [
		'https://images.unsplash.com/photo-1590290320564-4575418a7061?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1428765048792-aa4bdde46fea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1611580271540-3d52b90addf6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1555134473-a8e88487e828?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	],
});

export function returnDay(dt, offset) {
	var d = new Date(dt * 1000 + offset * 1000);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	var day = d.getUTCDay();
	var num = day % days.length;

	return days[num];
}

export function returnDays(dt, offset, slice) {
	let array = [];
	var d = new Date(dt * 1000 + offset * 1000);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var day = d.getUTCDay();
	let firstHalf = days.slice(day, days.length);
	let secondHalf = days.slice(0, day);
	firstHalf.map((element) => array.push(element));
	secondHalf.map((element) => array.push(element));
	array.push(days[day]);

	return slice ? array.slice(0, 5) : array;
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
	let array = hours.filter((element, index) => index % 3 === 0);
	return array;
}

export function uvIndex(index) {
	const colors = [
		{
			background: 'rgb(149,242,94)',
			backgroundTwo:
				'radial-gradient(circle, rgba(149,242,94,0.8326681014202556) 0%, rgba(94,242,143,0.6758053563222164) 49%, rgba(111,216,252,0.1491947120645133) 100%)',
		},
		{
			background: 'rgb(252,205,98)',
			backgroundTwo:
				'radial-gradient(circle, rgba(252,205,98,1) 0%, rgba(252,205,98,0.6057773451177346) 49%, rgba(149,242,94,1) 100%)',
		},
		{
			background: 'rgb(230,106,102)',
			backgroundTwo:
				'radial-gradient(circle, rgba(230,106,102,1) 0%, rgba(230,106,102,0.6085784655659139) 49%, rgba(252,205,98,0.434908997778799) 100%)',
		},
		{
			background: 'rgb(227,25,19)',
			backgroundTwo:
				'radial-gradient(circle, rgba(227,25,19,0.9671218829328606) 0%, rgba(230,106,102,0.6225840678068102) 49%, rgba(230,106,102,0.5805672610841212) 100%)',
		},
		{
			background: 'rgb(129,96,247)',
			backgroundTwo:
				'radial-gradient(circle, rgba(129,96,247,1) 0%, rgba(129,96,247,0.5917717428768383) 49%, rgba(227,25,19,0.4096989137451855) 100%)',
		},
	];

	const description = ['good', 'fair', 'moderate', 'poor', 'very poor'];
	const message = [
		'Air quality is satisfactory, and air pollution poses little or no risk.',
		'Air quality is acceptable. However, there may be a risk for some people.',
		'Members of sensitive groups may experience health effects.',
		'Members of sensitive groups may experience more serious health effects.',
		'Health alert: The risk of health effects is increased for everyone.',
	];

	return { color: colors[index - 1], description: description[index - 1], message: message[index - 1] };
}

export const trans = (x, y, s, z) =>
	`perspective(600px) translateZ(${z}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function getCurrentLocation(list) {
	const geolocationAPI = navigator.geolocation;
	geolocationAPI.getCurrentPosition((position) => {
		let lat = position.coords.latitude.toString().slice(0, 4);
		let lng = position.coords.longitude.toString().slice(0, 4);

		let firstFilter = list.filter((city) => city.lat.toString().slice(0, 4) === lat);
		let secondFilter = firstFilter.filter((city) => city.lng.toString().slice(0, 4) === lng);

		return secondFilter;
	});
}

export function moonPhase(phase) {
	if (phase === 0) {
		return { src: 'new-moon.png', name: 'New Moon' };
	} else if (0 < phase < 0.25) {
		return { src: 'waxing-crescent-moon.png', name: 'Waxing Crescent Moon' };
	} else if (phase === 0.25) {
		return { src: 'last-quarter-moon.png', name: 'First Quarter Moon' };
	} else if (phase > 0.25 && phase < 0.5) {
		return { src: 'waxing-gibbous-moon.png', name: 'Waxing Gibbous Moon' };
	} else if (phase === 0.5) {
		return { src: 'full-moon.png', name: 'Full Moon' };
	} else if (phase > 0.5 && phase < 0.75) {
		return { src: 'waning-gibbous-moon.png', name: 'Waning Gibbous Moon' };
	} else if (phase === 0.75) {
		return { src: 'last-quarter-moon.png', name: 'Last Quarter Moon' };
	} else if (0.75 < phase < 1) {
		return { src: 'waning-crescent-moon.png', name: 'Waning Crescent Moon' };
	} else {
		return { src: 'new-moon.png', name: 'New Moon' };
	}
}

export const multipleClassNames = (classNames) => join(concat(classNames), ' ');
