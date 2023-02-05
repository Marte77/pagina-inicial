export function ExpandableSection(props) {
	let title = props.title,
		arrayOfContents = props.arrayOfContents;
	let open = props.open === undefined ? true : props.open;
	let conteudo = [];
	arrayOfContents.forEach(function (content, index) {
		conteudo.push(<li key={index}>{content}</li>);
	});
	return (
		<details open={open}>
			<summary>{title}</summary>
			<ul>{conteudo}</ul>
		</details>
	);
}
