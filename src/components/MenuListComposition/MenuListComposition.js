import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import { map } from 'lodash';
import * as React from 'react';

const MenuListComposition = ({ header, items, onClick }) => {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const handleClick = (event, value) => {
		handleClose(event);
		onClick(value);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<Stack direction="row" spacing={2}>
			<div>
				<Button
					aria-controls={open ? 'composition-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup="true"
					id="composition-button"
					onClick={handleToggle}
					ref={anchorRef}
					sx={{ color: 'text.primary' }}
				>
					{header || 'Dashboard'}
				</Button>
				<Popper
					anchorEl={anchorRef.current}
					disablePortal
					open={open}
					placement="bottom-start"
					role={undefined}
					transition
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										aria-labelledby="composition-button"
										autoFocusItem={open}
										id="composition-menu"
										onKeyDown={handleListKeyDown}
									>
										{map(items, (el) => (
											<MenuItem onClick={(e) => handleClick(e, el?.value)}>{el?.label}</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</Stack>
	);
};

export default MenuListComposition;
