import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";

type SnackbarWrapperProps = {
	message: string
}
type SnackbarWrapperState = {
	open: boolean,
	Transition: (props: SlideProps) => JSX.Element,
	vertical: "top" | "bottom"
	horizontal: "center" | "left" | "right"
}

export function SnackbarWrapper(props: SnackbarWrapperProps) {
	const [state, setState] = React.useState<SnackbarWrapperState>({
		open: true,
		Transition: Slide,
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
		<Snackbar
			open={state.open}
			onClose={handleClose}
			key={vertical + horizontal}
			autoHideDuration={2100}
			anchorOrigin={{ vertical, horizontal }}
			TransitionComponent={state.Transition}
		>
			<Alert variant="filled" icon={false} severity="success">{props.message}</Alert>
		</Snackbar>
	);
}
