import { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { Window as Wrapper } from '../../styled-components';

export const Window = ({ style, onClick, children, id, isDisabled }) => {
	const elementRef = useRef(null);
	const { setActiveWrapper } = useContext(AppContext);

	const [isWrapperHovered, setIsWrapperHovered] = useState('');
	const client = document.getElementById('scrollable-container');

	const [spring, springApi] = useSpring(() => ({
		from: {
			boxShadow: `0px 4px 10px -1px  rgba(0, 0, 0, 0.3)`,
		},
	}));

	const scrollGraphInView = useCallback(() => {
		if (onClick) {
			onClick();
		} else {
			setActiveWrapper(id);
			client?.scrollTo({
				top: client?.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [onClick, setActiveWrapper, id, client]);

	useLayoutEffect(() => {
		if (!isDisabled) {
			springApi?.start({
				to: {
					boxShadow: isWrapperHovered
						? `0px 0px 10px 0px rgba(123 ,0 ,255, 1)`
						: `0px 4px 10px -1px  rgba(0, 0, 0, 0.3)`,
				},
			});
		}
	}, [isWrapperHovered, springApi, isDisabled]);

	const combinedStyle = { ...style, ...spring };

	return (
		<Wrapper
			id={id}
			onClick={() => (isDisabled ? {} : scrollGraphInView())}
			onMouseEnter={() => setIsWrapperHovered(true)}
			onMouseLeave={() => setIsWrapperHovered(false)}
			ref={elementRef}
			style={{ ...combinedStyle, cursor: isDisabled ? 'auto' : 'pointer' }}
		>
			{children}
		</Wrapper>
	);
};
