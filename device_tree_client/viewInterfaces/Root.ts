import { ViewInterface } from "@mcesystems/reflow";

export interface Node {
    id: number;
    vendorId?: number;
    productId?: number;
    deviceName: string;
    type: string;
    isAvailable: boolean;
    childrens: Node[] | null;
}

export interface Input {
    root: Node;
}



export default interface Root extends ViewInterface<Input> { }