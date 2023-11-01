import { useState } from "react";
import { Window } from "./window";
import { WindowButtonsEnum } from "./windowButtonsEnum";
import styles from "../../App.module.css";

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
			<ul className={styles["tree-view"]}>
				<li className={styles["tree-view"]}>
					This website is better viewed in a desktop browser!
				</li>
			</ul>
			<section
				className={styles["field-row"]}
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
