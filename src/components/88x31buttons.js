import { Grid } from "@mui/material";
import get_java_now from "../images/gifs/get_java_now.gif";
import hate_squarespace from "../images/gifs/hate_squarespace.png";
import vscode_button from "../images/gifs/vscode_button.gif";
import powered_by_debian from "../images/gifs/powered_by_debian.gif";
import mozilla_gecko from "../images/gifs/mozilla_gecko.gif";
import made_with_macos1 from "../images/gifs/made_with_macos1.gif";
import lol from "../images/gifs/lol.gif";
import hello_kitty from "../images/gifs/hello_kitty.gif";

export function Buttons88x31(props) {
	let style = { pointerEvents: "none" };
	let buttons = [
		{ alt: "get_java_now", button: get_java_now },
		{ alt: "hate_squarespace", button: hate_squarespace },
		{ alt: "vscode_button", button: vscode_button },
		{ alt: "powered_by_debian", button: powered_by_debian },
		{ alt: "mozilla_gecko", button: mozilla_gecko },
		{ alt: "made_with_macos1", button: made_with_macos1 },
		{ alt: "lol", button: lol },
		{ alt: "hello_kitty", button: hello_kitty },
	];
	return (
		<Grid style={style} container spacing={2} position="fixed" bottom={1}>
			<Grid item container xs={4}></Grid>
			<Grid
				item
				container
				xs={4}
				style={{ textAlign: "center", fontSize: 22 }}
			>
				made with&nbsp;
				<a
					href="https://jdan.github.io/98.css/#window"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "white", pointerEvents:'all' }}
				>
					98.css
				</a>
				&nbsp; and react
			</Grid>
			<Grid item container xs={4}></Grid>
			<Grid item container xs={3.32}></Grid>
			{buttons.map((btn, index) => {
				return (
					<Grid key={index} item container xs={0.69}>
						<img alt={btn.alt} src={btn.button}></img>
					</Grid>
				);
			})}
		</Grid>
	);
}
