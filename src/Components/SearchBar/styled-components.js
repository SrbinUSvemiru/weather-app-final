import styled from 'styled-components';

export const SearchBarContainer = styled.div`
	color: white;
	display: flex;
	padding: 0.5rem;
	align-items: center;
	justify-content: center;
	position: relative;
	& #search-bar {
		background: rgba(42, 33, 51, 0.25);
		padding: 0.1rem 1rem;
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(6.5px);
		-webkit-backdrop-filter: blur(6.5px);
		border: 1px solid rgba(42, 33, 51, 0.14);
		cursor: pointer;
		color: white;
		font-size: 1.2rem;
		border-radius: 10px;
	}
	& ::placeholder {
		color: #ffffff;
		opacity: 0.7;
	}
	& textarea:focus,
	input:focus {
		outline: none;
		background-color: transparent;
	}
	& .list {
		display: flex;
		flex-direction: column;
		width: 280px;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 27px;
		z-index: 100;
		border-radius: 10px;
		font-size: 1.3rem;
		background: white;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	& #list-btn {
		width: 300px;
		all: unset;
		padding: 0.2rem;
		font-size: 1.1rem;
		opacity: 0.8;
		color: black;
		margin-left: 0.5rem;
		& #span {
			font-weight: 700;
			opacity: 0.8;
		}
	}

	& #list-btn:hover {
		opacity: 1;
		cursor: pointer;
	}
	& #location-btn {
		all: unset;
		margin-left: 0.5rem;
		border-radius: 50%;
		background: black;
		cursor: pointer;
		padding: 0.1rem;
		width: 20px;
		height: 20px;
		opacity: 0.4;
		&:hover {
			opacity: 1;
		}
		& img {
			filter: invert(100%) sepia(0%) saturate(7471%) hue-rotate(137deg) brightness(108%) contrast(94%);
			width: 100%;
		}
	}
`;
