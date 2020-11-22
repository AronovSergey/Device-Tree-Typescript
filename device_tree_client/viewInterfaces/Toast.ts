import { ViewInterface } from "@mcesystems/reflow";

export interface Input {
    message?: string;
    isOpen: boolean;
}

export interface Events {
    handleClose: {
        e?: React.SyntheticEvent;
        reason?: string;
    }
}



export default interface Toast extends ViewInterface<Input, Events> { }