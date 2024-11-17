import styled from 'styled-components';
import { animated } from 'react-spring';

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

export const Window = styled(animated.div)`
	/* From https://css.glass */
	background: rgba(42, 33, 51, 0.25);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(6.5px);
	-webkit-backdrop-filter: blur(6.5px);
	border: 1px solid rgba(42, 33, 51, 0.14);
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	position: relative;
	user-select: none;
`;
