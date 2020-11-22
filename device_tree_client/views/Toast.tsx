import * as React from "react";
import ToastInterface from "../viewInterfaces/Toast";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";

//MUI Stuff
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Toast extends ReflowReactComponent<ToastInterface>{
    render() {
        const { message, isOpen, event } = this.props;

        const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
            event("handleClose", { e, reason })
        };

        return (
            <div
                style={{
                    width: "100%"
                }}
            >
                <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
            </div>

        );
    }

}

export default Toast;


