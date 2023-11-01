import { Tooltip, Zoom } from "@mui/material";
import get_java_now from "../../images/gifs/get_java_now.gif";
import hate_squarespace from "../../images/gifs/hate_squarespace.png";
import vscode_button from "../../images/gifs/vscode_button.gif";
import powered_by_debian from "../../images/gifs/powered_by_debian.gif";
import mozilla_gecko from "../../images/gifs/mozilla_gecko.gif";
import made_with_macos1 from "../../images/gifs/made_with_macos1.gif";
import lol from "../../images/gifs/lol.gif";
import hello_kitty from "../../images/gifs/hello_kitty.gif";
import botao_broda from "../../images/gifs/botao_broda.png";
import "../main-page/buttonsscroll.css";

function makeButtonObj(btn: string){
	return {alt: btn.toLowerCase(), button: btn}
}

export function Buttons88x31() {
	let buttons = [
		makeButtonObj(get_java_now),
		makeButtonObj(hate_squarespace),
		makeButtonObj(vscode_button),
		makeButtonObj(powered_by_debian),
		makeButtonObj(mozilla_gecko),
		makeButtonObj(made_with_macos1),
		makeButtonObj(lol),
		makeButtonObj(hello_kitty),
		makeButtonObj(botao_broda),
	];
	return (
		<>
			<div
				style={{
					position: "fixed",
					bottom: "6%",
					pointerEvents: "none",
				}}
			>
				made with&nbsp;
				<a
					href="https://jdan.github.io/98.css/#window"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "white", pointerEvents: "all" }}
				>
					98.css
				</a>
				&nbsp; and react
			</div>

			<div className="container" >
				{buttons.map((btn, index) => {
					if (btn.alt !== botao_broda.toLowerCase())
						return (
							<div key={btn.alt} style={{pointerEvents:'none'}} className="box">
								<img alt={btn.alt} src={btn.button}></img>
							</div>
						);
					let redirectBroda = () => {
						window.location.href = "http://ricadinho.eu";
					};

					return (
						<div
							key={btn.alt}
							className="box"
							style={{
								pointerEvents: "all",
								cursor: "crosshair",
							}}
						>
							<Tooltip
								title="BRODA"
								placement="top"
								disableInteractive
								TransitionComponent={Zoom}
								followCursor
								arrow
							>
								<img
									alt={btn.alt}
									src={btn.button}
									onClick={redirectBroda}
								></img>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</>
	);
}
