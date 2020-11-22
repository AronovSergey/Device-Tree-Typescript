import axios from "axios";
import { Flow } from "@mcesystems/reflow";
import { ViewInterfacesType } from "../viewInterfaces";

import { Node } from "../viewInterfaces/Root";

enum TabOptions {
    NormalTree = 0,
    TypeTree = 1
}

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
    let tabValue: TabOptions = TabOptions.NormalTree;
    let normalRoot: Node;
    let typeRoot: Node;

    const layoutView = view(0, views.Layout, { title: "Device Tree" });

    const tabsBarView = view(0, views.TabsBar, { tabValue }, layoutView)
        .on("handleTabChange", async ({ newValue }) => {
            tabValue = newValue;
            tabsBarView.update({ tabValue });
            rootView.update({ root: tabValue === TabOptions.NormalTree ? normalRoot : typeRoot });
        });

    const circularProgressView = view(1, views.CircularProgress, {}, layoutView);

    const toastView = view(2, views.Toast, {
        isOpen: false
    }, layoutView)
        .on("handleClose", async ({ e, reason }) => {
            if (reason === "clickaway") {
                return;
            }
            toastView.update({ isOpen: false })
        });

    await axios.get("http://localhost:12345/api/v1.0/tree")
        .then((response) => {
            normalRoot = response.data.root;
            typeRoot = response.data.typeRoot;
        })
        .catch((error) => {
            console.log(error);
        });

    const rootView = view(1, views.Root, {
        root: tabValue === TabOptions.NormalTree ? normalRoot : typeRoot
    }, layoutView);

    const socket = new WebSocket('ws://localhost:12345');
    // Listen for messages
    socket.addEventListener('message', async function (event) {
        toastView.update({ message: event.data, isOpen: true })

        await axios.get("http://localhost:12345/api/v1.0/tree")
            .then((response) => {
                normalRoot = response.data.root;
                typeRoot = response.data.typeRoot;
            })
            .catch((error) => {
                console.log(error);
            });
        rootView.update({ root: tabValue === TabOptions.NormalTree ? normalRoot : typeRoot });
    });

    // awaiting a never-ending promise to hang the flow
    await new Promise(() => { });
});