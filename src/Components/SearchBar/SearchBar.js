import React, { useState, useEffect } from 'react';
import { animated } from 'react-spring';
import citiesList from 'cities.json';
import { SearchBarContainer } from './styled-components';
import { isEqual, slice, filter } from 'lodash';
import { v4 as uuid } from 'uuid';

function SearchBar({ setCities, cities, setOpen }) {
	const [cityName, setCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);

	useEffect(() => {
		const list = citiesList.filter((post) => {
			if (!cityName) {
				return '';
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

	const handleAddCity = (obj) => {
		const array = cities?.length ? cities : [];
		const sliced = [{ ...obj, lon: obj?.lng, id: uuid() }, ...slice(array, 0, array?.length - 1)];

		localStorage.setItem('cities', JSON.stringify(sliced));
		setCities(sliced);

		setSearchCities([]);
		setCityName('');
		setOpen(true);
	};

	const handleLocationClick = () => {
		if (navigator.geolocation) {
			const geolocationAPI = navigator.geolocation;
			geolocationAPI.getCurrentPosition((position) => {
				let lat = position.coords.latitude.toString().slice(0, 4);
				let lng = position.coords.longitude.toString().slice(0, 4);

				const array = filter(
					citiesList,
					(city) => city.lat.toString().slice(0, 4) === lat && city.lng.toString().slice(0, 4) === lng,
				);

				setSearchCities(array);
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
			<button onClick={handleLocationClick} id="location-btn" title="Current Location">
				<img src="./location-icon.png" />
			</button>

			<div className="list">
				{searchCities?.map((citie, index) => (
					<animated.button
						key={citie.name + index}
						value={citie}
						id="list-btn"
						onClick={() => handleAddCity(citie)}
					>
						{citie.name} <span id="span">{citie.country}</span>
					</animated.button>
				))}
			</div>
		</SearchBarContainer>
	);
}

export default SearchBar;
