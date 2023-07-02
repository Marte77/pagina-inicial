import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

export function SnackbarWrapper(props) {
	const [state, setState] = React.useState({
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
