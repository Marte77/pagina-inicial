import { ClickAwayListener, Tooltip } from "@mui/material";
import { SyntheticEvent, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Draggable from "react-draggable";
import { WindowButtonsEnum } from "./windowButtonsEnum";
import styles from "../../App.module.css";
import { Button98 } from "../html_tags/html";

const getRandom = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

declare global {
	interface Window {
		safari:any
	}
}
type WindowProps = {
	buttons?: Array<WindowButtonsEnum>,
	title?: string,
	tooltip?: string,
	pos?: {
		x: number, y: number
	},
	onClose?: (() => void),
	style?: React.CSSProperties,
	children: React.ReactNode 
}

export function Window(props: WindowProps) : JSX.Element {
	const nodeRef = useRef(null);
	let [isWindowOpen, setWindowOpen] = useState(true);
	let [openTooltip, setOpenTooltip] = useState(false);
	const handleTooltipClose = (e: Event | SyntheticEvent<Element, Event>) => {
		setOpenTooltip(false);
		if (window.safari !== undefined) {
			console.log(
				"yes the tooltip button moves, i do not know why nor do i want to"
			);
		}
	};
	const handleTooltipOpen = (e: Event | SyntheticEvent<Element, Event>) => {
		setOpenTooltip(true);
	};
	let buttons = [];
	let tooltip = props.tooltip;
	if (props.buttons)
		for (let btn of props.buttons) {
			if (btn === WindowButtonsEnum.hide) {
				buttons.push(
					<Button98
						key={btn}
						onClick={() => setWindowOpen(!isWindowOpen)}
						aria-label="Minimize"
					></Button98>
				);
			} else if (btn === WindowButtonsEnum.help) {
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
									<Button98
										aria-label={btn}
										onClick={handleTooltipOpen}
									></Button98>
								</Tooltip>
							</div>
						</ClickAwayListener>
					);
				} else {
					buttons.push(<Button98 aria-label={btn} key={btn}></Button98>);
				}
			} else if (btn === WindowButtonsEnum.close) {
				if (props.onClose)
					buttons.push(
						<Button98
							key={btn}
							aria-label={btn}
							onClick={props.onClose}
						></Button98>
					);
				else buttons.push(<Button98 key={btn} aria-label={btn}></Button98>);
			} else {
				buttons.push(<Button98 key={btn} aria-label={btn}></Button98>);
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
	let style = props.style ?? {};
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
		>
			<div ref={nodeRef}>
				<div className={styles["window"]}>
					<div className={styles["title-bar"]} style={cursorStyle} >
						<div style={cursorStyle} className={styles["title-bar-text"]}>{props.title ?? ""}</div>
						<div style={cursorStyle} className={styles["title-bar-controls"]}>{buttons}</div>
					</div>
					{isWindowOpen && (
						<div className={styles["window-body"]} style={style}>
							{props.children}
						</div>
					)}
				</div>
			</div>
		</Draggable>
	);
}
