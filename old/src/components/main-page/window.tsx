import { ClickAwayListener, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Draggable, { PositionOffsetControlPosition } from "react-draggable";
import { WindowButtonsEnum } from "./windowButtonsEnum";
import styles from "../../App.module.css";
import { Button98 } from "../html_tags/html";

const getRandom = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function Window(props: Readonly<WindowProps>) : JSX.Element {
	const nodeRef = useRef(null);
	const [isWindowOpen, setIsWindowOpen] = useState(true);
	const [openTooltip, setOpenTooltip] = useState(false);
	const handleTooltipClose = () => {
		setOpenTooltip(false);
		if (window.safari !== undefined) {
			console.log(
				"yes the tooltip button moves, i do not know why nor do i want to"
			);
		}
	};
	const handleTooltipOpen = () => {
		setOpenTooltip(true);
	};
	const buttons = [];
	const tooltip = props.tooltip;
	
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
		const x = window.screen.availWidth / 2;
		const y = window.screen.availHeight / 2;
		const val = 500;
		pos.x = getRandom(-(x - val), x - val);
		pos.y = getRandom(-(y - val), y - val);
	}
	if (props.buttons)
		for (const btn of props.buttons) {
			switch(btn)
			{
				case WindowButtonsEnum.close: {
					if (props.onClose)
						buttons.push(
							<Button98
								key={btn}
								aria-label={btn}
								onClick={props.onClose}
							></Button98>
						);
					else buttons.push(<Button98 key={btn} aria-label={btn}></Button98>);
					break;
				}
				case WindowButtonsEnum.hide: {
					buttons.push(
						<Button98
							key={btn}
							onClick={() => setIsWindowOpen(!isWindowOpen)}
							aria-label="Minimize"
						></Button98>
					);
				} break;
				case WindowButtonsEnum.max: {
					buttons.push(<Button98 key={btn} aria-label={btn}></Button98>);
					break;
				}
				case WindowButtonsEnum.help: {
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
					break;
				}
			}
		}
	const style = props.style ?? {};
	//style["overflow"] = "auto";
	const cursorStyle = {cursor:"grab"}
	let titleClassName = styles["title-bar-text"]
	let posOffset: PositionOffsetControlPosition | undefined = undefined
	if (props.title !== undefined && props.title.toLowerCase().indexOf("conexoes")>-1) {
		titleClassName = titleClassName.concat(" rainbowa")
		if (!isMobile) {
			posOffset = {
				x:'-42%',
				y:'-85%'
			}
		}
	}
	return (
		<Draggable
			nodeRef={nodeRef}
			defaultPosition={{
				x: pos.x,
				y: pos.y,
			}}
			positionOffset={posOffset}
			bounds="parent"
			disabled={isMobile}
			onStop={(ev,data)=>{console.log(data, ev)}}
		>
			<div ref={nodeRef}
			style={{zIndex:2,...style}}>
				<div className={styles["window"]}>
					<div className={styles["title-bar"]} style={cursorStyle} >
						<div style={cursorStyle} className={titleClassName}>{props.title ?? ""}</div>
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
