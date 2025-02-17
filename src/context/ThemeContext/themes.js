export const defaultLight = {
	background: {
		window: '-webkit-linear-gradient(70deg,rgba(236, 239, 242, 0.7), rgba(248, 250, 252, 0.9) 70%)',
		windowShade: 'rgba(248, 250, 252, 0.49)',
		default: 'rgba(226,232,240, 1)',
		light: 'rgba(180,202,255,1)',
		header: '#ffffff',
		shadeOne: 'rgba(241,245,249,1)',
		shadeTwo: 'rgba(248,250,252,1)',
	},
	border: 'rgba(121, 151, 162, 0.3)',

	scrollbarColor: {
		primary: 'rgb(156 163 175)',
		background: 'rgb(209 213 219)',
		hover: 'rgb(229 231 235)',
	},
	primary: {
		main: '#008EB6',
		light: '#00A5E0',
		highlight: '#58C3E0',
	},
	secondary: {
		main: '#5e09dc',
		light: '#cf7aff',
	},
	accent: {
		main: 'hsl(20, 90.60%, 62.40%)',
		light: 'hsl(33, 83.60%, 64.10%)',
	},
	wrapper: {
		temperature: { light: '#007bff', dark: '#F7C265' },
		humidity: { light: '#4facfe', dark: '#00f2fe' },
		precipitation: { light: '#e0c3fc', dark: '#8ec5fc' },
		wind: { light: '#abecd6', dark: '#fbed96' },
		days: { light: '#c779d0', dark: '#4bc0c8' },
	},
	temperature: 'hsl(213, 100.00%, 46.10%)',
};

export const defaultDark = {
	background: {
		default: 'rgba(6,12,26,1)',
		window: '-webkit-linear-gradient(70deg,rgba(36, 46, 61, 0.9), rgba(51, 65, 85, 0.9) 70%)',
		windowShade: 'rgba(51, 65, 85, 0.49)',
		header: '#2d4059',
		light: 'rgb(58 74 111)',
		shadeOne: 'rgba(24,33,47,1)',
		shadeTwo: 'rgba(12,21,34,1)',
	},
	border: 'rgba(255, 255, 255, 0.2)',
	scrollbarColor: {
		primary: 'rgb(51 65 85)',
		background: ' rgb(30 41 59)',
		hover: 'rgb(107 114 128)',
	},
	primary: {
		main: '#2d4059',
		light: '#41618B',
		highlight: '#008EB6',
	},
	secondary: {
		main: 'rgb(118, 33, 246)',
		light: '#9D4EDD',
	},
	accent: {
		main: 'hsl(20, 80%, 45.90%)',
		light: 'hsl(33, 80%, 46.50%)',
	},
	wrapper: {
		temperature: { light: '#f7e199', dark: '#f7c2b2' },
		humidity: { light: '#4facfe', dark: '#00f2fe' },
		precipitation: { light: '#e0c3fc', dark: '#8ec5fc' },
		wind: { light: '#abecd6', dark: '#fbed96' },
		days: { light: '#c779d0', dark: '#4bc0c8' },
	},
	temperature: 'hsl(177, 31.20%, 75.50%)',
};
