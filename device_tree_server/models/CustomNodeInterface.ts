export interface CustomNodeInterface {
    id: number;
    vendorId?: number;
    productId?: number;
    deviceName: string;
    type?: "Device" | "Hub" | "Server" | "Devices" | "Hubs" | null | undefined;
    isAvailable?: "Disconnected" | "Available" | null | undefined;
    childrens?: CustomNodeInterface[] | null;
}