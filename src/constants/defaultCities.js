import { v4 as uuid } from 'uuid';

export const defaultCities = () => [
	{ id: uuid(), country: 'EG', name: 'New Cairo', lat: '30.03', lon: '31.47', weight: 1 },
	{ id: uuid(), country: 'AR', name: 'Los Menucos', lat: '-40.84402', lon: '-68.08718', weight: 2 },
	{ id: uuid(), country: 'RS', name: 'Novi Sad', lat: '45.25167', lon: '19.83694', weight: 3 },
	{ id: uuid(), country: 'RS', name: 'Zemun', lat: '44.8458', lon: '20.40116', weight: 4 },
	{ id: uuid(), country: 'RS', name: 'Novi Beograd', lat: '44.80556', lon: '20.42417', weight: 5 },
	{ id: uuid(), lat: '', lon: '', weight: 6 },
	{ id: uuid(), lat: '', lon: '', weight: 7 },
	{ id: uuid(), lat: '', lon: '', weight: 8 },
	{ id: uuid(), lat: '', lon: '', weight: 9 },
];
