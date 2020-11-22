import * as React from "react";
import TabsBarInterface from "../viewInterfaces/TabsBar";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";

//MUI Stuff
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



class TabsBar extends ReflowReactComponent<TabsBarInterface> {
    render() {
        const { tabValue, event } = this.props;
        return (
            <div>
                <Paper square>
                    <Tabs
                        value={tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, newValue) => event("handleTabChange", { newValue })}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Tree View" />
                        <Tab label="Grouping by type" />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}


export default TabsBar;