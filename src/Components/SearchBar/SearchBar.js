import { Box, List, ListItemButton, TextField, Typography } from '@mui/material';
import citiesList from 'cities.json';
import { slice } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';

const SearchBar = ({ setIsDrawerOpen, isDrawerOpen, handleCloseCurrentWeather }) => {
	const [cityName, setCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);

	const { cities, setCities } = useContext(AppContext);

	const containerRef = useRef(null);

	useEffect(() => {
		const list = citiesList?.filter((post) => post?.name?.toLowerCase()?.startsWith(cityName.toLowerCase()) || '');

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

	// const handleLocationClick = () => {
	// 	if (navigator.geolocation) {
	// 		const geolocationAPI = navigator.geolocation;
	// 		geolocationAPI.getCurrentPosition((position) => {
	// 			let lat = position.coords.latitude.toString().slice(0, 4);
	// 			let lng = position.coords.longitude.toString().slice(0, 4);

	// 			const array = filter(
	// 				citiesList,
	// 				(city) => city.lat.toString().slice(0, 4) === lat && city.lng.toString().slice(0, 4) === lng,
	// 			);

	// 			setSearchCities(array);
	// 		});
	// 	}
	// };

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
		<Box ref={containerRef} sx={{ width: isDrawerOpen ? '100%' : '300px', position: 'relative' }}>
			<TextField
				className="text"
				id="search-bar"
				label="Enter a city name"
				onInput={(e) => {
					setCityName(e.target.value);
				}}
				placeholder="Search..."
				size="small"
				sx={{
					width: '100%',
					'& .MuiInputBase-root': {
						backgroundColor: 'primary.main', // Use theme's primary color
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'primary.light', // Optional: Set the border color
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: 'secondary.main', // Optional: Border on hover
					},
				}}
				value={cityName}
				variant="outlined"
			/>
			{/* <IconButton type="submit" aria-label="search">
					<Search style={{ fill: 'blue' }} />
				</IconButton> */}

			<List
				sx={{
					position: 'absolute',
					top: 40,
					backgroundColor: 'primary.light',
					width: '100%',
					display: cityName ? 'block' : 'none',
					overflowY: 'scroll',
					maxHeight: '500px',
					borderRadius: '0px 0px 16px 16px',
				}}
			>
				{searchCities?.map((city, index) => (
					<ListItemButton
						key={index}
						onClick={() => handleAddCity(city)}
						sx={{ padding: '0.5rem', background: 'primary.light' }}
					>
						<Typography fontWeight={700} variant="subtitle1">
							{city?.name}
						</Typography>
						<Typography
							fontWeight={700}
							sx={{ color: 'text.secondary', marginLeft: '0.5rem' }}
							variant="subtitle1"
						>
							{city?.country}
						</Typography>
					</ListItemButton>
				))}
			</List>
		</Box>
	);
};

export default SearchBar;
