import { join, concat } from 'lodash';

export function offsetDate(offset) {
	var d = new Date(new Date().getTime() + offset * 1000);
	var hrs = d.getUTCHours();
	var mins = d.getUTCMinutes();
	var secs = d.getUTCSeconds();

	return [hrs, mins, secs];
}

const getNestedValue = (obj, path) => {
	return path.split('.').reduce((acc, key) => acc && acc[key], obj);
};

export const getMinMax = (arr, field, minOrMax) => {
	return arr.reduce(
		(acc, curr) => {
			const value = getNestedValue(curr, field);
			return minOrMax === 'min' ? Math.min(acc, value) : Math.max(acc, value);
		},
		minOrMax === 'min' ? Infinity : -Infinity,
	);
};

export function returnAlertTime(dt, offset) {
	var d = new Date(dt * 1000 + offset * 1000);
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	var day = d.getUTCDay();
	var num = day % days.length;

	var dayOfMonth = d.getUTCDate();

	var hrs = d.getUTCHours() <= 9 ? `0${d.getUTCHours()}` : d.getUTCHours();
	var mins = d.getUTCMinutes() <= 9 ? `0${d.getUTCMinutes()}` : d.getUTCMinutes();

	let suffix = dayOfMonth;

	switch (suffix) {
		case 1:
			suffix = '1st';
			break;
		case 2:
			suffix = '2nd';
			break;
		case 3:
			suffix = '3rd';
			break;

		case 21:
			suffix = `21st`;
			break;
		case 22:
			suffix = '22nd';
			break;
		case 23:
			suffix = '23rd';
			break;
		case 31:
			suffix = `${suffix}st`;
			break;
		default:
			suffix = `${suffix}th`;
	}

	let date = `${days[num]} ${suffix}`;
	let time = `${hrs}:${mins}`;

	return { date: date, time: time };
}

export function returnDate(offset) {
	var d = new Date(new Date().getTime() + offset * 1000);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var day = d.getUTCDay();
	var dayOfMonth = d.getUTCDate();
	var year = d.getUTCFullYear();
	var month = d.getUTCMonth() + 1;

	return [year, month, dayOfMonth, days[day]];
}

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
	let array = hours.filter((element, index) => {
		return index % 3 === 0;
	});
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

export const Images = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];

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
