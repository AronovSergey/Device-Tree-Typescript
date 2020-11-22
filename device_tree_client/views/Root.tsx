import * as React from "react";
import RootInterface from "../viewInterfaces/Root";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";

import CustomNode from "./statelessComponents/CustomNode";

//MUI Stuff
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

class Root extends ReflowReactComponent<RootInterface> {
    render() {
        const { root } = this.props;
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                style={{
                    height: 240,
                    flexGrow: 1,
                    maxWidth: 400,
                    paddingTop: 20
                }}
            >
                <CustomNode data={root} key={0} />
            </TreeView>
        );
    }
}

export default Root;