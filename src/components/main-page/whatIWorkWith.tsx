import { ExpandableSection } from "./expandableSection";
import { Window } from "./window";
import { WindowButtonsEnum } from "./windowButtonsEnum";
import styles from "../../App.module.css";
import { Ul98, Li98 } from "../html_tags/html";
type WhatIWorkWithProps = {
	style?: React.CSSProperties,
}

export function WhatIWorkWith(props: Readonly<WhatIWorkWithProps>) {
	return (
		<Window
			pos={{ x: 25, y: 65 }}
			tooltip="this tooltip fits well with the theme"
			title="What I work with"
			buttons={[WindowButtonsEnum.help, WindowButtonsEnum.hide]}
			style={props.style}
		>
			<Ul98 className={styles["tree-view"]}>
				<Li98>
					<ExpandableSection
						title="Work experience"
						arrayOfContents={[
							<ExpandableSection
								key="job"
								title="My previous job at Altice Labs"
								arrayOfContents={["Java using JSLEE", "SIP"]}
							/>,
							<ExpandableSection
								key="ipv"
								title={["In IPV Health+",<br key="br"/>, "(project I participated in during school)"]}
								arrayOfContents={[
									"Flutter/Dart",
									"MySQL",
									"PHP",
								]}
							/>,
						]}
					/>
					<ExpandableSection
						title="Outside of work / as Hobby"
						open={false}
						arrayOfContents={[
							"Rust, getting better at it",
							"Learning WebGPU (using Rust)",
							"Flutter/Dart",
							"Python (for automation)",
							"Node.js",
							"Java",
							"C++, mostly for Arduino",
							"decent at using linux",
						]}
					/>
				</Li98>
			</Ul98>
		</Window>
	);
}
