import { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { Window as Wrapper } from '../../styled-components';
import { BackButton } from '../BackButton/BackButton';

export const Window = ({ onButtonClick, shouldSkip = false, onClick, children, id, style, isDisabled }) => {
	const elementRef = useRef(null);
	const { setActiveWrapper } = useContext(AppContext);

	const [isWrapperHovered, setIsWrapperHovered] = useState('');
	const client = document.getElementById('scrollable-container');

	const [spring, springApi] = useSpring(() => ({
		from: {
			boxShadow: `0px 10px 15px -4px rgba(0, 0, 0, 0.3)`,
		},
	}));

	const { ref: inViewRef, inView } = useInView({
		delay: 500,
		root: client,
		skip: shouldSkip,
		initialInView: false,
		threshold: 1,
		rootMargin: `${elementRef?.current?.getBoundingClientRect()?.height - 60 || 0}px 0px -${client?.getBoundingClientRect()?.height - elementRef?.current?.getBoundingClientRect()?.height - 68 || 0}px 0px`,
	});

	const combinedRef = (node) => {
		inViewRef(node);
		elementRef.current = node;
	};

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
						: `0px 10px 15px -4px rgba(0, 0, 0, 0.3)`,
				},
			});
		}
	}, [isWrapperHovered, springApi, isDisabled]);

	const combinedStyle = { ...style, ...spring };

	console.log(shouldSkip);

	return (
		<Wrapper
			id={id}
			onClick={() => (isDisabled ? {} : scrollGraphInView())}
			onMouseEnter={() => setIsWrapperHovered(true)}
			onMouseLeave={() => setIsWrapperHovered(false)}
			ref={combinedRef}
			style={{ ...combinedStyle, cursor: isDisabled ? 'auto' : 'pointer' }}
		>
			{shouldSkip ? null : <BackButton inView={inView} onClick={onButtonClick} />}
			{children}
		</Wrapper>
	);
};
