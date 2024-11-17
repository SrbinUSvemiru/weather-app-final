import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Window, MessageContainer, StartAndFinishContainer, Container } from './styled-components';
import { returnAlertTime } from '../../Utils/utils';
import { useSpring, animated, easings, useTrail } from 'react-spring';

function AlertMessageWindow(props) {
	const [message, setMessage] = useState();
	const [width, setWidth] = useState();

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

	useLayoutEffect(() => {
		setWidth(ref.current.offsetWidth);
	}, [message]);

	const messageLoop = useSpring({
		config: { easings: easings.easeInOutBack, duration: width * 70 },
		loop: true,
		from: { x: 290 },
		to: { x: -width - 16 },
		reset: true,
	});

	return (
		<Window
			style={{
				...props.animation,
			}}
		>
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
							<img src="./warning.png" />
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
							<img src="./smiley.png" />
						</div>
					</StartAndFinishContainer>
				</>
			)}
		</Window>
	);
}

export default AlertMessageWindow;
