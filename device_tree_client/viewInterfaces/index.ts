import Layout from "./Layout";
import TabsBar from "./TabsBar";
import Root from "./Root";
import Empty from "./EmptyInterface";
import Toast from "./Toast";

export const viewInterfaces = {
    Layout: <Layout>{},
    TabsBar: <TabsBar>{},
    Root: <Root>{},
    CircularProgress: <Empty>{},
    Toast: <Toast>{},
};

export type ViewInterfacesType = typeof viewInterfaces;