import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertModal(props) {
	const [open, setOpen] = React.useState(props.showOpen);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
				</DialogTitle>
				<DialogContent>
					
					{props.success === true && (<DialogContentText id="alert-dialog-slide-description">
						{ props.message } has been saved Successfully.
					</DialogContentText>)}
					{props.success === false && (<DialogContentText id="alert-dialog-slide-description">
						{ props.message }
					</DialogContentText>)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
