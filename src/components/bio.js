import { Window } from "./window";
import { windowButtons } from "./windowButtonsEnum";

export function Bio(props) {
	const minhaIdade = Math.abs(
		new Date(new Date() - new Date("2001/7/7")).getUTCFullYear() - 1970
	);

	return (
		<Window
			buttons={[windowButtons.hide]}
			title="About me"
			pos={{ x: -200, y: -250 }}
		>
			<ul className="tree-view">
				I'm Martinho, I'm a {minhaIdade}&nbsp;years old software
				engineer. <br />
				I'm currently working at Altice Labs in the ABC team.
				<br />
			</ul>
		</Window>
	);
}
