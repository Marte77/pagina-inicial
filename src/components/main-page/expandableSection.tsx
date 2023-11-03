import { Details98, Li98, Summary98, Ul98 } from "../html_tags/html";

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
		conteudo.push(<Li98 key={key}>{content}</Li98>);
	});
	return (
		<Details98 open={open}>
			<Summary98>{title}</Summary98>
			<Ul98>{conteudo}</Ul98>
		</Details98>
	);
}
