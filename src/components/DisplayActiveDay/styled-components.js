import { animated } from 'react-spring';
import styled from 'styled-components';

export const MainWeather = styled.div`
	& .row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		padding: 0.5rem;
		& .image-container {
			width: 40px;
			& img {
				width: 100%;
			}
		}
	}

	& .row + .row {
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	& #container {
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		min-width: 200px;

		& > h4 {
			margin: 0;
			font-weight: 500;
			opacity: 0.7;
		}
		& p {
			margin: 0;
			font-weight: 400;
			opacity: 1;
		}
		& img {
			width: 20px;
		}
	}
	& #whole {
		display: flex;
	}
	& #side + #side {
		margin-left: 2rem;
	}
	& #sun {
		display: flex;
		align-items: center;

		& > img {
			width: 15px;
			margin-right: 0.3rem;
			filter: invert(100%) sepia(28%) saturate(2%) hue-rotate(174deg) brightness(107%) contrast(101%);
		}
	}
`;

export const Day = styled(animated.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-radius: 5px;
	width: 100%;
	& > img {
		width: 100%;
		width: 40px;
	}
`;

export const Window = styled(animated.div)`
	/* From https://css.glass */
	background: rgba(251, 247, 255, 0.15);
	border-radius: 16px;
	border: 2px solid rgba(251, 247, 255, 0.22);
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	position: relative;
	user-select: none;
`;
