import { easings } from '@react-spring/web';

export const getCloseAnimation = ({ api, onRest = () => {} }) =>
	new Promise((resolve) =>
		api.start((i) => ({
			config: { easing: easings?.easeInOutBack, duration: 700 },
			from: { opacity: 1, xys: [0, 0, 1, 0], backdropFilter: 'blur(7.5px)' },
			to: { opacity: 0, xys: [30, 0, 0.3, 50], backdropFilter: 'blur(0px)' },
			delay: () => (i + 1) * 50,
			onRest: () => {
				onRest();
				resolve();
			},
		})),
	);
export const getOpenAnimation = ({ api, onRest = () => {} }) =>
	new Promise((resolve) => {
		api.start((i) => ({
			config: { easing: easings?.easeInOutQuint, duration: 500 },
			from: { opacity: 0, xys: [30, 0, 0.3, 50], backdropFilter: 'blur(0px)' },
			to: { opacity: 1, xys: [0, 0, 1, 0], backdropFilter: 'blur(7.5px)' },
			delay: () => (i + 1) * 50,
			onRest: () => {
				onRest();
				resolve();
			},
		}));
	});

export const getRemoveTile = ({ api, updatedCities, onRest = () => {}, idx }) =>
	new Promise((resolve) => {
		api.start((i) => {
			if (i === idx) {
				return {
					config: { easing: easings?.easeInOutQuint, duration: 700 },
					from: { opacity: 1, xys: [0, 0, 1, 0], backdropFilter: 'blur(7.5px)' },
					to: { opacity: 0, xys: [50, 0, 0.3, 50], backdropFilter: 'blur(0px)' },

					onRest: () => {
						onRest();
						resolve();
					},
				};
			}
			return {
				opacity: 1, // Preserve opacity
				xys: [0, 0, 1, 0], // Preserve xys transformation
				backdropFilter: 'blur(7.5px)', // Preserve current blur state
				boxShadow:
					!updatedCities[i]?.lat || !updatedCities[i]?.lon
						? `0px 0px 0px 0px rgba(0, 0, 0, 0)`
						: `0px 3px 8px -1px rgba(0, 0, 0, 0.2)`, // Preserve shadow
			};
		});
	});
export const getAppearTile = ({ api, onRest = () => {}, updatedCities, onStart = () => {}, idx, isDark = false }) =>
	new Promise((resolve) => {
		api.start((j) => {
			if (j === idx) {
				return {
					config: { easing: easings?.easeOutCirc, duration: 1000 },
					from: {
						opacity: 0,
						xys: [0, 0, 0.5, 500],
						backdropFilter: 'blur(0px)',
					},
					to: [
						{
							opacity: 1,
							xys: [0, 0, 1, 0],
							backdropFilter: 'blur(7.5px)',
							boxShadow: !isDark
								? `0px 0px 10px 0px rgb(94, 9, 220)`
								: `0px 0px 10px 0px rgb(118, 33, 246)`,
						},
						{
							boxShadow: !isDark
								? `0px 0px 10px 0px rgb(94, 9, 220)`
								: `0px 0px 10px 0px rgb(118, 33, 246)`,
							config: { duration: 2000 },
						},
						{
							boxShadow:
								!updatedCities[j]?.lat || !updatedCities[j]?.lon
									? `0px 0px 0px 0px rgba(0, 0, 0, 0)`
									: `0px 3px 8px -1px rgba(0, 0, 0, 0.2)`,
						},
					],
					onStart: () => {
						onStart();
					},
					onRest: () => {
						onRest();
						resolve();
					},
				};
			}
			return {
				opacity: 1, // Preserve opacity
				xys: [0, 0, 1, 0], // Preserve xys transformation
				backdropFilter: 'blur(7.5px)', // Preserve current blur state
				boxShadow:
					!updatedCities[j]?.lat || !updatedCities[j]?.lon
						? `0px 0px 0px 0px rgba(0, 0, 0, 0)`
						: `0px 3px 8px -1px rgba(0, 0, 0, 0.2)`, // Preserve shadow
			};
		});
	});
