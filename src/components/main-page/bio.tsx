import { Window } from "./window";
import { WindowButtonsEnum } from "./windowButtonsEnum";

export function Bio(props: {}) : JSX.Element{
	const minhaIdade = Math.abs(
		new Date(new Date().getTime() - new Date("2001/7/7").getTime()).getUTCFullYear() - 1970
	);

	return (
		<Window
			buttons={[WindowButtonsEnum.hide]}
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
