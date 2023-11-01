type ExpandableSectionProps = {
	title: string | Array<string | JSX.Element>,
	arrayOfContents: Array<string> | Array<JSX.Element>
	open?: boolean
}

export function ExpandableSection(props: ExpandableSectionProps) {
	let title = props.title,
		arrayOfContents = props.arrayOfContents;
	let open = props.open ?? true;
	let conteudo: Array<React.ReactNode> = [];
	arrayOfContents.forEach(function (content, index) {
		let key = typeof content === "string" ? content : content.key;
		conteudo.push(<li key={key}>{content}</li>);
	});
	return (
		<details open={open}>
			<summary>{title}</summary>
			<ul>{conteudo}</ul>
		</details>
	);
}
