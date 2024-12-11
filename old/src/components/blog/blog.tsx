import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownPreview from "@uiw/react-markdown-preview";
import styles from "../../App.module.css";
import "../html_tags/md_wrapper";
import "@material/web/button/filled-button";
import "@material/web/button/outlined-button";
import "@material/web/checkbox/checkbox";
import "@material/web/ripple/ripple";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/divider/divider";
import { theme, systemDark, applyTheme } from "../theming/theme";
import { Button98 } from "../html_tags/html";
import { WindowButtonsEnum } from "../main-page/windowButtonsEnum";
import { HexColorPicker } from "react-colorful";
import { argbFromHex, themeFromSourceColor } from "@material/material-color-utilities";

const githubRaw =
	"https://raw.githubusercontent.com/projetosinuteismarte77/blogs-md/";
const mainURL = githubRaw + "main/blog-md/";
const mainURLFile = mainURL + "/list/";

type BlogListProps = {
	list: Array<string> | undefined;
};
type BlogFileProps = {
	name: string;
};
/// min and max included
/*function randomIntFromInterval(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}*/

function BlogList(props: BlogListProps) {
	const navigate = useNavigate();
	let docLoc = document.location.toString();
	if (docLoc.endsWith("/")) docLoc = docLoc.substring(0, docLoc.length - 1);
	return (
		<md-list>
			{props.list?.map(function (val2:string) {
				const val = val2.split("-").join(" ").split(".md")[0];
				return (
					<div
						key={
							val
						}
					>
						<md-list-item
							href={`${docLoc}/${val2}`}
							onClick={() => navigate("/blog/" + val2)}
						>
							{val}
							<md-ripple />
						</md-list-item>
						<md-divider />
					</div>
				);
			})}
		</md-list>
	);
}

function BlogFile(props: BlogFileProps) {
	const [content, setContent] = useState<string>();
	useEffect(() => {
		async function getFile() {
			try {
				const res = await axios.get(mainURLFile + props.name);
				setContent(res.data);
			} catch (error) {
				console.error(error);
			}
		}
		getFile();
	}, [props.name]);
	return (
		<div style={{backgroundColor: "var(--md-sys-color-background)",}}>
			<MarkdownPreview
				style={{ paddingLeft: "4%", paddingRight: "4%",}}
				source={content}
			/>
		</div>
	);
}
applyTheme(theme, {
	target: document.getElementById("swag")!,
	dark: systemDark,
});

function ColorPicker() {
	
	const [color, setColor] = useState("#EC00FF");
	const onChange = (color: string) => {
		setColor(color)
		applyTheme(themeFromSourceColor(argbFromHex(color)), {
			target: document.getElementById("swag")!,
			dark: systemDark,
		});
	}
	return (
		<HexColorPicker color={color} onChange={onChange} />
	)
}

export function Blog() {
	const navigate = useNavigate();
	const { name } = useParams();
	const [pagesList, setList] = useState<Array<string>>();
	useEffect(() => {
		async function getLista() {
			try {
				let res = await axios.get(mainURL + "list.md", {
					headers: {
						Accept: "text/plain",
					},
				});
				let r = res.data.split("\n");
				console.debug(res, r);
				setList(r);
			} catch (error) {
				console.error(error);
			}
		}
		if (name === undefined) getLista(); //estando undefined so corre no /blog, mesmo estando como parametro do useEffect, vai correr ao mudar, mas sendo undefined, so faz o pedido uma vez
	}, [name]);

	const handleClick = () => {
		navigate("/");
		setColorPickerState(false);
	};
	const openColorPicker = () => {
		if(window.location.pathname.endsWith('/blog') || window.location.pathname.endsWith('/blog/'))
			setColorPickerState(!colorPickerState);
	};
	const [colorPickerState, setColorPickerState] = useState(false);
	
	return (
		<div
			id="swag"
			style={{
				backgroundColor: "var(--md-sys-color-background)",
				height: "100vh",
			}}
		>
			<div>
				<div className={`${styles["title-bar"]} ${styles["inactive"]}`}>
					<div className={styles["title-bar-text"]}>
						{name ?? "List"}
					</div>
					<div className={styles["title-bar-controls"]}>
						<Button98
							aria-label={WindowButtonsEnum.help}
							onClick={openColorPicker}
						/>
						<Button98
							aria-label={WindowButtonsEnum.close}
							onClick={handleClick}
						/>
					</div>
				</div>
			</div>
			<div>
				{name === undefined ? (
					<BlogList list={pagesList} />
				) : (
					<BlogFile name={name} />
				)}
				{colorPickerState ? <ColorPicker/> : null}
			</div>
			
		</div>
	);
}
