import React, { useState, useEffect, useRef } from 'react';
import { animated } from 'react-spring';
import citiesList from 'cities.json';
import { SearchBarContainer } from './styled-components';
import { isEqual, slice, filter } from 'lodash';
import { v4 as uuid } from 'uuid';
import { TextField, IconButton, List, ListItemButton, Typography, Box } from '@mui/material';
import Search from '@mui/icons-material/Search';

function SearchBar({ setCities, cities, setOpen, setIsDrawerOpen, isDrawerOpen, handleCloseCurrentWeather }) {
	const [cityName, setCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);

	const containerRef = useRef(null);

	useEffect(() => {
		const list = citiesList?.filter((post) => {
			return post?.name?.toLowerCase()?.startsWith(cityName.toLowerCase()) || '';
		});

		const sorted = list.sort(function (a, b) {
			return a?.name?.length - b?.name?.length;
		});
		const sliced = sorted?.slice(0, 20);

		setSearchCities(sliced);
	}, [cityName, cities]);

	const handleAddCity = (obj) => {
		const array = cities?.length ? cities : [];
		const sliced = [{ ...obj, lon: obj?.lng, id: uuid() }, ...slice(array, 0, array?.length - 1)];
		setCities(sliced);
		setSearchCities([]);
		setCityName('');
		setIsDrawerOpen(false);
		if (isDrawerOpen) {
			handleCloseCurrentWeather();
		}
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

	const handleOutsideClick = (e) => {
		if (containerRef.current && !containerRef.current.contains(e.target)) {
			setCityName('');
			setSearchCities([]);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<Box searchCities={searchCities} ref={containerRef} sx={{ width: isDrawerOpen ? '100%' : '300px' }}>
			<TextField
				id="search-bar"
				className="text"
				value={cityName}
				onInput={(e) => {
					setCityName(e.target.value);
				}}
				label="Enter a city name"
				variant="outlined"
				placeholder="Search..."
				size="small"
				sx={{ position: 'relative', background: '#2d4059', padding: 0, width: '100%' }}
			/>
			{/* <IconButton type="submit" aria-label="search">
					<Search style={{ fill: 'blue' }} />
				</IconButton> */}

			<List
				sx={{
					position: 'absolute',
					top: 33,
					width: '100%',
					display: cityName ? 'block' : 'none',
					background: '#2d4059',
					overflowY: 'scroll',
					maxHeight: '500px',
					borderRadius: '0px 0px 16px 16px',
					'&::-webkit-scrollbar': {
						width: '8px', // Width of the scrollbar
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#888', // Color of the scrollbar thumb
						borderRadius: '8px', // Rounded corners for the scrollbar thumb
					},
					'&::-webkit-scrollbar-thumb:hover': {
						background: '#555', // Darker color on hover
					},
					'&::-webkit-scrollbar-track': {
						background: '#2d4059', // Color of the scrollbar track
					},
				}}
			>
				{searchCities?.map((city, index) => (
					<ListItemButton sx={{ padding: '0.5rem' }} onClick={() => handleAddCity(city)}>
						<Typography variant="subtitle1" fontWeight={700}>
							{city?.name}
						</Typography>
						<Typography
							variant="subtitle1"
							fontWeight={700}
							sx={{ color: 'text.secondary', marginLeft: '0.5rem' }}
						>
							{city?.country}
						</Typography>
					</ListItemButton>
				))}
			</List>
		</Box>
	);
}

export default SearchBar;
