import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, List, ListItemButton, TextField, Typography } from '@mui/material';
import citiesList from 'cities.json';
import { findIndex, map, set, slice, sortBy } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { getAppearTile, getCloseAnimation, getOpenAnimation, getRemoveTile } from '../../utils/animations';

const SearchBar = ({ setIsDrawerOpen, cityToReplace, setCityToReplace, setOpen, openApi, open }) => {
	const [inputCityName, setInputCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);
	const [isListOpen, setIsListOpen] = useState(false);

	const textFieldRef = useRef(null);

	const { cities, setCities, setAnimation } = useContext(AppContext);

	const containerRef = useRef(null);

	useEffect(() => {
		const list = inputCityName
			? citiesList?.filter((post) => post?.name?.toLowerCase()?.startsWith(inputCityName?.toLowerCase()))
			: [];

		const sorted = list.sort(function (a, b) {
			return a?.name?.length - b?.name?.length;
		});
		const sliced = sorted?.slice(0, 7);

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
		const idx = replaceIdx > -1 ? replaceIdx : emptyIdx;

		setSearchCities([]);
		setInputCityName('');
		setCityToReplace('');
		setIsDrawerOpen(false);

		const client = document.getElementById('scrollable-container');
		const closeAnimation = () =>
			getCloseAnimation({
				api: openApi,
				onRest: () => {
					setOpen(true);
				},
			});

		const openAnimation = () =>
			getOpenAnimation({
				api: openApi,
				onRest: () => {
					client?.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				},
			});

		const removeTileAnimation = () =>
			getRemoveTile({
				api: openApi,
				idx,
				onRest: () => {
					setCities(sortBy(updatedCities, 'weight'));
				},
			});

		const appearTileAnimation = () =>
			getAppearTile({
				api: openApi,
				idx,
				onRest: () => {},
			});

		if (!open) {
			const animationChain = () =>
				closeAnimation()
					.then(() => openAnimation())
					.then(() => removeTileAnimation())
					.then(() => appearTileAnimation())
					.catch((error) => console.error('Animation error:', error));
			// Pass the animation function to the parent component's state
			setAnimation(() => animationChain); // Store it in the parent's state
		} else {
			removeTileAnimation()
				.then(() => appearTileAnimation())
				.catch((error) => console.error('Animation error:', error));
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
				width: '100%',
				position: 'relative',
				borderRadius: '16px',
				padding: 0,
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<IconButton aria-label="search" sx={{ color: 'text.secondary' }} type="submit">
				<SearchIcon sx={{ fontSize: '2rem' }} />
			</IconButton>
			<TextField
				className="text"
				fontSize={'2rem'}
				inputRef={textFieldRef}
				onFocus={() => setIsListOpen(true)}
				onInput={(e) => {
					setInputCityName(e.target.value);
				}}
				placeholder="Search..."
				size="medium"
				sx={{
					padding: 0,
					fontSize: '2rem',
					borderRadius: '16px',
					width: '100%',
					height: '100%',
					'& .MuiInput-underline:before': {
						borderBottom: 'none', // Remove the bottom line before interaction
					},
					'& .MuiInput-underline:after': {
						borderBottom: 'none', // Remove the bottom line after interaction
					},
					'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
						borderBottom: 'none', // Remove the bottom line on hover
					},
				}}
				value={inputCityName}
				variant="standard"
			/>

			{isListOpen ? (
				<List
					sx={{
						position: 'absolute',
						top: 35,
						paddingLeft: '2rem',
						width: '100%',
						zIndex: 100,
						backgroundColor: 'background.header',
						display: inputCityName ? 'block' : 'none',
						overflowY: 'hidden',
					}}
				>
					{map(searchCities, (city, index) => (
						<ListItemButton
							disabled={!city?.lat || !city?.lng}
							key={index}
							onClick={() => handleAddCity(city)}
							sx={{ padding: '0.1rem 1rem', background: 'primary.light' }}
						>
							<Typography variant="subtitle1">{city?.name}</Typography>
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
