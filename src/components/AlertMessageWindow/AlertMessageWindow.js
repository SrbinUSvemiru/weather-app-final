import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { animated, easings, useSpring } from 'react-spring';

import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useGetFetchedQuery } from '../../queries/useCitiesQuery';
import { returnAlertTime, trans } from '../../utils/utils';
import { Window } from '../Window/Window';
import { MessageContainer, StartAndFinishContainer } from './styled-components';

const AlertMessageWindow = (props) => {
	const [message, setMessage] = useState(null);

	const { isXs } = useBreakpoint();
	const ref = useRef(null);

	const data = useGetFetchedQuery(props.currentCity);

	useEffect(() => {
		if (data?.alerts) {
			let start = returnAlertTime(data?.alerts[0]?.start, data?.timezone_offset);
			let end = returnAlertTime(data?.alerts[0]?.end, data?.timezone_offset);

			setMessage({
				text: data?.alerts[0]?.description,
				start: start,
				end: end,
				event: data?.alerts[0]?.event,
			});
		} else {
			setMessage(null);
		}
	}, [data]);

	const messageLoop = useSpring({
		config: { easings: easings.easeInOutBack, duration: 10000 },
		loop: true,
		from: { opacity: 0 },
		to: { opacity: 1 },
		reset: true,
	});

	return (
		<Window
			id={'alert-message'}
			isDisabled={true}
			onButtonClick={props?.handleCloseCurrentWeather}
			shouldSkip={!isXs}
			style={{ ...props?.style, transform: props?.style?.xys.to(trans) }}
		>
			<Box sx={{ width: '100%', height: '100%', minWidth: '200px', position: 'relative', overflow: 'hidden' }}>
				{message !== null ? (
					<>
						<MessageContainer>
							<animated.p ref={ref} style={messageLoop}>
								{message?.text === '' ? message?.event : message?.text}
							</animated.p>
						</MessageContainer>

						<StartAndFinishContainer>
							<div>
								<p>
									From {message?.start.date} {message?.start.time}
								</p>
								<p>
									Until {message?.end.date} {message?.end.time}
								</p>
							</div>
							<div id="warning">
								<img alt="warning" src="./warning.png" />
							</div>
						</StartAndFinishContainer>
					</>
				) : (
					<>
						<MessageContainer>
							<animated.p ref={ref} style={messageLoop}>
								No current alerts...
							</animated.p>
						</MessageContainer>
						<StartAndFinishContainer>
							<p id="enjoy">Enjoy your day!</p>
							<div id="warning">
								<img alt="smiley" src="./smiley.png" />
							</div>
						</StartAndFinishContainer>
					</>
				)}
			</Box>
		</Window>
	);
};

export default AlertMessageWindow;
