import { ViewInterface } from "@mcesystems/reflow";

export interface Input {
    tabValue: number;
}

export interface Events {
    handleTabChange: {
        newValue: number;
    };
}



export default interface TabsBar extends ViewInterface<Input, Events> { }