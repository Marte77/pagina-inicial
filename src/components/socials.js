import { Window } from "./window";
import github from "../images/github.svg";
import linkedin from "../images/linkedin.png";

export function Socials(props) {
	return (
		<Window title="Socials" pos={{ x: -500, y: 100 }}>
			<ul className="tree-view">
				<li className="tree-view">
					<a
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
					</a>
					&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
					<a
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
					</a>
				</li>
			</ul>
		</Window>
	);
}
