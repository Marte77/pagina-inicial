import { useState } from "react";
import { Window } from "./window";
import { WindowButtonsEnum } from "./windowButtonsEnum";

type MobileWarningProps = {}

export function MobileWarning(props: MobileWarningProps) {
	const [isHidden, setHidden] = useState(false);
	return !isHidden ? (
		<Window
			onClose={() => setHidden(false)}
			title="Mobile user warning"
			buttons={[WindowButtonsEnum.close]}
			pos={{ x: -200, y: -250 }}
		>
			<ul className="tree-view">
				<li className="tree-view">
					This website is better viewed in a desktop browser!
				</li>
			</ul>
			<section
				className="field-row"
				style={{ justifyContent: "flex-end" }}
			>
				<button onClick={() => setHidden(true)}>
					I've been warned
				</button>
			</section>
		</Window>
	) : (
		<div></div>
	);
}
