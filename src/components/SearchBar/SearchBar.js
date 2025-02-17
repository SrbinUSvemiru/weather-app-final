import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, List, ListItemButton, TextField, Typography } from '@mui/material';
import citiesList from 'cities.json';
import { findIndex, map, set, slice, some, sortBy } from 'lodash';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { getAppearTile, getCloseAnimation, getOpenAnimation, getRemoveTile } from '../../utils/animations';

const SearchBar = ({ setIsDrawerOpen, cityToReplace, setCityToReplace, openApi }) => {
	const [inputCityName, setInputCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);
	const [isListOpen, setIsListOpen] = useState(false);
	// const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });

	const textFieldRef = useRef(null);

	const { cities, setCities, setAnimation, setIsGridOpen, isGridOpen, theme } = useContext(AppContext);

	const containerRef = useRef(null);

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
				...map(slice(updatedCities, 0, updatedCities?.length - 1), (el) => ({ ...el })),
				{ ...newCity, weight: updatedCities?.length },
			];
		}
		const idx = replaceIdx > -1 ? replaceIdx : emptyIdx > -1 ? emptyIdx : updatedCities?.length - 1;

		setSearchCities([]);
		setInputCityName('');
		setCityToReplace('');
		setIsDrawerOpen(false);

		const client = document.getElementById('scrollable-container');
		const closeAnimation = () =>
			getCloseAnimation({
				api: openApi,
				onRest: () => {
					setIsGridOpen(true);
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
				updatedCities,
				idx,
				onRest: () => {
					setCities(sortBy(updatedCities, 'weight'));
				},
			});

		const appearTileAnimation = () =>
			getAppearTile({
				api: openApi,
				idx,
				updatedCities,
				isDark: theme?.mode === 'dark',
				onStart: () => {
					const element = document.getElementById(`${newCity?.id}`);

					if (element) {
						client.scrollTo({
							top: element.offsetTop,
							behavior: 'smooth',
						});
					}
				},
				onRest: () => {},
			});

		if (!isGridOpen) {
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

	// const handleGetLocation = () => {
	// 	if (!navigator.geolocation) {
	// 		setLocation({ ...location, error: 'Geolocation is not supported by your browser.' });
	// 		return;
	// 	}

	// 	navigator.geolocation.getCurrentPosition(
	// 		(position) => {
	// 			setLocation({
	// 				latitude: position.coords.latitude,
	// 				longitude: position.coords.longitude,
	// 				error: null,
	// 			});
	// 		},
	// 		(error) => {
	// 			setLocation({ ...location, error: error.message });
	// 		},
	// 	);
	// };

	useEffect(() => {
		const list = inputCityName
			? citiesList?.filter((post) => post?.name?.toLowerCase()?.startsWith(inputCityName?.toLowerCase()))
			: [];

		const sorted = list?.sort(function (a, b) {
			return a?.name?.length - b?.name?.length;
		});
		const sliced = sorted?.slice(0, 7);

		setSearchCities(sliced?.length ? sliced : [{ name: 'No results...' }]);
	}, [inputCityName, cities, cityToReplace]);

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

	useLayoutEffect(() => {
		if (textFieldRef.current) {
			textFieldRef.current.focus();
		}
	}, []);

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
			<TextField
				className="text"
				inputRef={textFieldRef}
				onFocus={() => setIsListOpen(true)}
				onInput={(e) => {
					setInputCityName(e.target.value);
				}}
				placeholder="Search..."
				size="medium"
				slotProps={{
					input: {
						startAdornment: (
							<IconButton
								aria-label="search"
								disabled={true}
								sx={{ color: 'text.secondary' }}
								type="submit"
							>
								<SearchIcon sx={{ fontSize: '2rem' }} />
							</IconButton>
						),
						endAdornment: inputCityName ? (
							<IconButton
								onClick={(e) => {
									e.stopPropagation();
									setInputCityName('');
								}}
								sx={{ color: 'text.secondary' }}
							>
								<ClearOutlinedIcon sx={{ fontSize: '2rem' }} />
							</IconButton>
						) : null,
					},
				}}
				sx={{
					padding: 0,
					borderRadius: '16px',
					width: '100%',
					height: '100%',
					'& .MuiInputBase-input': {
						fontSize: '1.5rem', // Change the font size here
					},
					// '& .MuiInput-underline:before': {
					// 	borderBottom: 'none',
					// },
					// '& .MuiInput-underline:after': {
					// 	borderBottom: 'none',
					// },
					// '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
					// 	borderBottom: 'none',
					// },
				}}
				value={inputCityName}
				variant="standard"
			/>

			{isListOpen ? (
				<List
					sx={{
						position: 'absolute',
						top: 50,
						paddingLeft: '2rem',
						width: '100%',
						zIndex: 100,
						backgroundColor: 'background.shadeOne',
						display: inputCityName ? 'block' : 'none',
						overflowY: 'hidden',
					}}
				>
					{map(searchCities, (city, index) => (
						<ListItemButton
							disabled={!city?.lat || !city?.lng || some(cities, { lat: city?.lat, lng: city?.lng })}
							key={index}
							onClick={() => handleAddCity(city)}
							sx={{ padding: '0.1rem 1rem', background: 'primary.light' }}
						>
							<Typography sx={{ fontSize: '1.5rem' }} variant="subtitle1">
								{city?.name}
							</Typography>
							<Typography
								fontWeight={700}
								sx={{ color: 'text.secondary', marginLeft: '0.5rem', fontSize: '1.5rem' }}
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
