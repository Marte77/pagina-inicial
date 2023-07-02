import { ExpandableSection } from "./expandableSection";
import { Window } from "./window";
import { windowButtons } from "./windowButtonsEnum";

export function WhatIWorkWith(props) {
	return (
		<Window
			pos={{ x: 25, y: 65 }}
			tooltip="this tooltip fits well with the theme"
			title="What I work with"
			buttons={[windowButtons.help, windowButtons.hide]}
		>
			<ul className="tree-view">
				<li>
					<ExpandableSection
						title="Work experience"
						arrayOfContents={[
							<ExpandableSection
								key="job"
								title="My current job at Altice Labs"
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
				</li>
			</ul>
		</Window>
	);
}
