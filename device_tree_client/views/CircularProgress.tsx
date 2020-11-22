import * as React from "react";
import EmptyInterface from "../viewInterfaces/EmptyInterface";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";

//MTU Stuff
import CircularProgress from "@material-ui/core/CircularProgress";

class CustomCircularProgress extends ReflowReactComponent<EmptyInterface>{
    render() {
        return (
            <div
                style={{
                    margin: "5em",
                    textAlign: "center"
                }}
            >
                <CircularProgress
                    size="200px"
                    thickness={1}
                    style={{
                        margin: "0 auto",
                        marginTop: "50px"
                    }}
                />
            </div>
        );
    }
};

export default CustomCircularProgress;