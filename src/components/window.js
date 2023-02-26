import { ClickAwayListener, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Draggable from "react-draggable";
import { windowButtons } from "./windowButtonsEnum";

const getRandom = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export function Window(props) {
	const nodeRef = useRef(null);
	let [isWindowOpen, setWindowOpen] = useState(true);
	let [openTooltip, setOpenTooltip] = useState(false);
	const handleTooltipClose = (e) => {
		setOpenTooltip(false);
		if (window.safari !== undefined) {
			console.log(
				"yes the tooltip button moves, i do not know why nor do i want to"
			);
		}
	};
	const handleTooltipOpen = (e) => {
		setOpenTooltip(true);
	};
	let buttons = [];
	let tooltip = props.tooltip;
	if (props.buttons)
		for (let btn of props.buttons) {
			if (btn === windowButtons.hide) {
				buttons.push(
					<button
						key={btn}
						onClick={() => setWindowOpen(!isWindowOpen)}
						aria-label="Minimize"
					></button>
				);
			} else if (btn === windowButtons.help) {
				if (tooltip !== undefined) {
					buttons.push(
						<ClickAwayListener
							key={btn}
							onClickAway={handleTooltipClose}
						>
							<div>
								<Tooltip
									PopperProps={{
										disablePortal: true,
									}}
									title={tooltip}
									disableHoverListener
									disableFocusListener
									disableTouchListener
									open={openTooltip}
									onClose={handleTooltipClose}
									arrow
								>
									<button
										aria-label={btn}
										onClick={handleTooltipOpen}
									></button>
								</Tooltip>
							</div>
						</ClickAwayListener>
					);
				} else {
					buttons.push(<button aria-label={btn} key={btn}></button>);
				}
			} else if (btn === windowButtons.close) {
				if (props.onClose)
					buttons.push(
						<button
							key={btn}
							aria-label={btn}
							onClick={props.onClose}
						></button>
					);
				else buttons.push(<button key={btn} aria-label={btn}></button>);
			} else {
				buttons.push(<button key={btn} aria-label={btn}></button>);
			}
		}
	let pos = props.pos
	if(pos === undefined){
		pos = {
			x:0,
			y:0
		}
	}
	if (isMobile) {
		pos.x = 0;
		pos.y = 0;
	} else {
		let x = window.screen.availWidth / 2;
		let y = window.screen.availHeight / 2;
		let val = 500;
		pos.x = getRandom(-(x - val), x - val);
		pos.y = getRandom(-(y - val), y - val);
	}
	let style = props.style === undefined ? {} : props.style;
	style["overflow"] = "auto";
	let cursorStyle = {cursor:"grab"}
	return (
		<Draggable
			nodeRef={nodeRef}
			defaultPosition={{
				x: pos.x,
				y: pos.y,
			}}
			bounds="parent"
			disabled={isMobile}
			handle=".title-bar"
		>
			<div ref={nodeRef}>
				<div className="window">
					<div className="title-bar" style={cursorStyle} >
						<div style={cursorStyle} className="title-bar-text">{props.title === undefined ? "​" : props.title}</div>
						<div style={cursorStyle} className="title-bar-controls">{buttons}</div>
					</div>
					{isWindowOpen && (
						<div className="window-body" style={style}>
							{props.children}
						</div>
					)}
				</div>
			</div>
		</Draggable>
	);
}
