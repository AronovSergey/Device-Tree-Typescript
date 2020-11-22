import * as React from "react";
import LayoutInterface from "../viewInterfaces/Layout";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class Layout extends ReflowReactComponent<LayoutInterface>{
    render() {
        const { title, children } = this.props;
        return (
            <Grid
                item
                container
                direction="column"
                spacing={3}
            >
                <div
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography
                                variant="h4"
                                noWrap
                                style={{
                                    paddingTop: 6,
                                    paddingLeft: 10,
                                    flexGrow: 1,
                                }}
                            >
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <Grid item xs={2} sm={3} />
                <Grid item container >
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={12} sm={10}>
                        {children}
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
            </Grid>
        );
    }
}

export default Layout;