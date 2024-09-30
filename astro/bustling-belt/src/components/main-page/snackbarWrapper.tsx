//import mui from "@mui/material"
//import SlideProps from "@mui/material"
//const { Alert, Slide, Snackbar }  = mui;
import React from "react";

type SnackbarWrapperProps = {
	message: string
}
type SnackbarWrapperState = {
	open: boolean,
	//Transition: (props: SlideProps) => JSX.Element,
	vertical: "top" | "bottom"
	horizontal: "center" | "left" | "right"
}

export function SnackbarWrapper(props: SnackbarWrapperProps) {
	const [state, setState] = React.useState<SnackbarWrapperState>({
		open: true,
		//Transition: Slide,
		vertical: "top",
		horizontal: "center",
	});
	const handleClose = () => {
		setState({
			...state,
			open: false,
		});
	};
	const { vertical, horizontal } = state;
	return (
		<p></p>
	);
}
