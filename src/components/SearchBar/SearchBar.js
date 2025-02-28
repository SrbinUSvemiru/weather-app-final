import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, List, ListItemButton, TextField, Typography } from '@mui/material';
import citiesList from 'cities.json';
import { findIndex, map, set, slice, some, sortBy } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';

const SearchBar = ({ setIsDrawerOpen, cityToReplace, setCityToReplace, isInDrawer }) => {
	const [inputCityName, setInputCityName] = useState('');
	const [searchCities, setSearchCities] = useState([]);
	const [isListOpen, setIsListOpen] = useState(false);
	// const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });

	const textFieldRef = useRef(null);

	const { cities, setCities, isGridOpen, setSelectedCity } = useContext(AppContext);

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
		// const idx = replaceIdx > -1 ? replaceIdx : emptyIdx > -1 ? emptyIdx : updatedCities?.length - 1;

		setSearchCities([]);
		setInputCityName('');
		setCityToReplace('');
		if (isInDrawer) {
			setIsDrawerOpen(false);
		}

		if (!isGridOpen) {
			setSelectedCity({ ...newCity });
			setCities(sortBy(updatedCities, 'weight'));
		} else {
			setCities(sortBy(updatedCities, 'weight'));
		}
	};

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
								<SearchIcon sx={{ fontSize: '1.5rem' }} />
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
								<ClearOutlinedIcon sx={{ fontSize: '1.5rem' }} />
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
						fontSize: '1rem', // Change the font size here
					},
					'& .MuiInput-underline:before': {
						borderColor: 'divider',
					},
					...(isInDrawer
						? {
								'& .MuiInput-underline:before': {
									borderBottom: 'none',
								},
								'& .MuiInput-underline:after': {
									borderBottom: 'none',
								},
								'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
									borderBottom: 'none',
								},
							}
						: {}),
				}}
				value={inputCityName}
				variant="standard"
			/>

			{isListOpen ? (
				<List
					sx={{
						position: 'absolute',
						top: 40,
						left: '50%',
						transform: 'translateX(-50%)',
						width: '110%',
						backdropFilter: 'blur(7.6px)',
						'-webkit-backdrop-filter': 'blur(7.6px)',
						backgroundColor: 'background.appBar',
						display: inputCityName ? 'block' : 'none',
						overflowY: 'hidden',
						borderRadius: '1rem',
						zIndex: 100,
					}}
				>
					{map(searchCities, (city, index) => (
						<ListItemButton
							disabled={!city?.lat || !city?.lng || some(cities, { lat: city?.lat, lng: city?.lng })}
							key={index}
							onClick={() => handleAddCity(city)}
							sx={{ padding: '0.1rem 1rem', margin: '0 auto' }}
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
