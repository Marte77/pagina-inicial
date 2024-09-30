import { Window } from "./window";
import github from "/src/images/github.svg";
import linkedin from "/src/images/linkedin.png"
import styles from "../../App.module.css";
import { Li98, Ul98, A98 } from "../html_tags/html";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SocialsProps = {
	style?: React.CSSProperties,
}

export function Socials(props: SocialsProps) {
	return (
		<Window title="Socials" pos={{ x: -500, y: 100 }} style={props.style}>
			<Ul98 className={styles["tree-view"]}>
				<Li98 className={styles["tree-view"]}>
					<A98
						href="https://github.com/Marte77/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={github}
							width={30}
							height={30}
							alt="github logo"
						/>
					</A98>
					&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
					<A98
						href="https://www.linkedin.com/in/martinhotav/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={linkedin}
							width={36}
							height={30}
							alt="twitter logo"
							style={{
								WebkitFilter: "grayscale(100%)",
								filter: "brightness(0)",
							}}
						/>
					</A98>
				</Li98>
			</Ul98>
		</Window>
	);
}
