import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(window?.matchMedia(query)?.matches ?? false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		// Update the state with the current value
		setMatches(mediaQuery.matches);
		// Create an event listener
		const handler = (event) => setMatches(event.matches);
		// Attach the event listener to know when the matches value changes
		mediaQuery.addEventListener('change', handler);
		// Remove the event listener on cleanup
		return () => mediaQuery.removeEventListener('change', handler);
	}, [query]);

	return matches;
};

export const useBreakpoint = () => ({
	isXs: useMediaQuery('(max-width: 599px)'),
	isSm: useMediaQuery('(min-width: 600px) and (max-width: 899px)'),
	isMd: useMediaQuery('(min-width: 900px) and (max-width: 1199px)'),
	isLg: useMediaQuery('(min-width: 1200px) and (max-width: 1535px)'),
	isXl: useMediaQuery('(min-width: 1536px)'),
});
