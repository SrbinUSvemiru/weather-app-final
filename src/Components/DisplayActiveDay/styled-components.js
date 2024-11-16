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
	backdrop-filter: saturate(50%) blur(10px);
	background: rgba(0, 0, 0, 0.3);
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	position: relative;
	user-select: none;
`;
