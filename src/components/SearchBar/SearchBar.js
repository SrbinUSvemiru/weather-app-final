import { Box, List, ListItemButton, TextField, Typography, useTheme } from '@mui/material';
import citiesList from 'cities.json';
import { findIndex, map, set, slice, sortBy } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';

const SearchBar = ({ setIsDrawerOpen, isDrawerOpen, cityToReplace, setCityToReplace, handleCloseCurrentWeather }) => {
	const [inputCityName, setInputCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);
	const [isListOpen, setIsListOpen] = useState(false);

	const theme = useTheme();

	const textFieldRef = useRef(null);

	const { cities, setCities } = useContext(AppContext);

	const containerRef = useRef(null);

	useEffect(() => {
		const list = inputCityName
			? citiesList?.filter((post) => post?.name?.toLowerCase()?.startsWith(inputCityName?.toLowerCase()))
			: [];

		const sorted = list.sort(function (a, b) {
			return a?.name?.length - b?.name?.length;
		});
		const sliced = sorted?.slice(0, 20);

		setSearchCities(sliced?.length ? sliced : [{ name: 'No results...' }]);
	}, [inputCityName, cities, cityToReplace]);

	const handleAddCity = (obj) => {
		let updatedCities = cities?.length ? [...cities] : [];
		const replaceIdx = findIndex(updatedCities, (el) => el?.id === cityToReplace);
		const emptyIdx = findIndex(updatedCities, (el) => !el?.lon || !el?.lat);

		const newCity = { ...obj, lon: obj?.lng, id: uuid(), weight: 1 };
		if (replaceIdx > -1) {
			set(newCity, 'weight', updatedCities[replaceIdx].weight);
			updatedCities[replaceIdx] = newCity;
		} else if (emptyIdx > -1) {
			set(newCity, 'weight', updatedCities[emptyIdx].weight);
			updatedCities[emptyIdx] = newCity;
		} else {
			updatedCities = [
				{ ...newCity },
				...map(slice(updatedCities, 0, updatedCities?.length - 1), (el) => ({ ...el, weight: el?.weight + 1 })),
			];
		}

		setCities(sortBy(updatedCities, 'weight'));
		setSearchCities([]);
		setInputCityName('');
		setCityToReplace('');
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
			setIsListOpen(false);
			setCityToReplace('');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (cityToReplace) {
			setIsListOpen(true);
		}
	}, [cityToReplace]);

	useEffect(() => {
		if (isListOpen && textFieldRef.current) {
			textFieldRef.current.focus();
		}
	}, [isListOpen]);

	return (
		<Box
			ref={containerRef}
			sx={{
				width: isDrawerOpen ? '100%' : '300px',
				position: 'relative',
				borderRadius: '16px',
				padding: 0,
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<TextField
				className="text"
				inputRef={textFieldRef}
				label="Enter city name"
				onFocus={() => setIsListOpen(true)}
				onInput={(e) => {
					setInputCityName(e.target.value);
				}}
				placeholder="Search..."
				size="small"
				sx={{
					padding: 0,
					borderRadius: '16px',
					width: '100%',
				}}
				value={inputCityName}
				variant="outlined"
			/>
			{/* <IconButton type="submit" aria-label="search">
					<Search style={{ fill: 'blue' }} />
				</IconButton> */}
			{isListOpen ? (
				<List
					sx={{
						position: 'absolute',
						top: 35,
						zIndex: 100,
						backgroundColor: 'background.window',
						border: `1px solid ${theme?.palette?.primary?.dark}`,
						width: '100%',
						display: inputCityName ? 'block' : 'none',
						overflowY: 'scroll',
						maxHeight: '500px',
						borderRadius: '0px 0px 16px 16px',
					}}
				>
					{map(searchCities, (city, index) => (
						<ListItemButton
							disabled={!city?.lat || !city?.lng}
							key={index}
							onClick={() => handleAddCity(city)}
							sx={{ padding: '0.3rem 1rem', background: 'primary.light' }}
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
			) : null}
		</Box>
	);
};

export default SearchBar;
