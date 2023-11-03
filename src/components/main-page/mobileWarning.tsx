import { useState } from "react";
import { Window } from "./window";
import { WindowButtonsEnum } from "./windowButtonsEnum";
import styles from "../../App.module.css";
import { Button98, Li98, Ul98 } from "../html_tags/html";

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
			<Ul98 className={styles["tree-view"]}>
				<Li98 className={styles["tree-view"]}>
					This website is better viewed in a desktop browser!
				</Li98>
			</Ul98>
			<section
				className={styles["field-row"]}
				style={{ justifyContent: "flex-end" }}
			>
				<Button98 onClick={() => setHidden(true)}>
					I've been warned
				</Button98>
			</section>
		</Window>
	) : (
		<div></div>
	);
}
