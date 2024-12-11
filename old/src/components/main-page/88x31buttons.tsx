import { Tooltip, Zoom } from "@mui/material";
import get_java_now from "/images/gifs/get_java_now.gif";
import hate_squarespace from "/images/gifs/hate_squarespace.png";
import vscode_button from "/images/gifs/vscode_button.gif";
import powered_by_debian from "/images/gifs/powered_by_debian.gif";
import mozilla_gecko from "/images/gifs/mozilla_gecko.gif";
import made_with_macos1 from "/images/gifs/made_with_macos1.gif";
import lol from "/images/gifs/lol.gif";
import hello_kitty from "/images/gifs/hello_kitty.gif";
import botao_broda from "/images/gifs/botao_broda.png";
import botao_mvg from "/images/gifs/botao_mvg.png";
import "./buttonsscroll.css";

function makeButtonObj(btn: string){
	return {alt: btn.toLowerCase(), button: btn}
}
interface RedirectButton{
	name:string,
	title:string,
	redirect:string
}
const redirectButtons: RedirectButton[] = [
	{name:botao_broda, title:"BRODA", redirect:"https://ricadinho.com"},
	{name:botao_mvg, title:"MVG", redirect:"https://mvg.lol"},
]

export function Buttons88x31() {
	const buttons = [
		makeButtonObj(get_java_now),
		makeButtonObj(hate_squarespace),
		makeButtonObj(vscode_button),
		makeButtonObj(powered_by_debian),
		makeButtonObj(botao_mvg),
		makeButtonObj(botao_broda),
		makeButtonObj(mozilla_gecko),
		makeButtonObj(made_with_macos1),
		makeButtonObj(lol),
		makeButtonObj(hello_kitty),
	];

	const hasRedirect = (btn: string): [boolean, RedirectButton | null] =>  {
		const res = redirectButtons.filter(val=>val.name === btn)
		const bo = res.length === 1
		return [bo, bo ? res[0] : null]
	}

	return (
		<div style={{ position: 'fixed', bottom: '0%', textAlign:'center', zIndex:0 }}>
			<div
				style={{
					pointerEvents: "none",
					paddingBottom:'16px'
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

			<div className="gridcontainer">
				{buttons.map((btn) => {
					const [result, redirectInfo] = hasRedirect(btn.alt)
					return (
						<div
							key={btn.alt}
							className="box"
							style={{
								pointerEvents: result ? "all" : "none",
								cursor: result ? "crosshair" : "auto", 
								height:'31px',
								width:'88px'
							}}
						>
							{
								!result ?
								<img alt={btn.alt} src={btn.button}></img>:
								<Tooltip
								title={redirectInfo!.title}
								placement="top"
								disableInteractive
								TransitionComponent={Zoom}
								followCursor
								arrow
							>
								<img
									alt={btn.alt}
									src={btn.button}
									onClick={()=>{window.location.href = redirectInfo!.redirect}}
								></img>
							</Tooltip>
							}
						</div>
					);
				})}
			</div>
		</div>
	);
}
