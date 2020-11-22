import { CustomNodeInterface } from "./CustomNodeInterface";
const CustomNode = require("./CustomNode");

class Tree {
    root: CustomNodeInterface | null;
    typeRoot: CustomNodeInterface | null;
    nextId: number;
    removedNodes: any[];

    constructor() {
        this.removedNodes = [];
        this.cleanData();
    }

    create_tree(devices) {
        this.cleanData();
        const appearance = this.count_appearance(devices);

        for (let i = 0; i < devices.length; i++) {
            const { vendorId, productId, deviceName, manufacturer } = devices[i];

            const index = devices[i].vendorId + devices[i].productId;

            if (appearance[index] === 0) continue;

            //Hub with one port 
            else if (appearance[index] === 1) {
                //New hub type
                if (manufacturer === "(Standard USB HUBs)") {
                    const node = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: "Hub" });
                    appearance[index]--
                    this.root.childrens.push(node);
                }
                //New device type
                else {
                    const hub = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName: `${deviceName}'s hub`, type: "Hub" });
                    const device = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: "Device" });
                    hub.childrens.push(device);
                    appearance[index]--
                    this.root.childrens.push(hub);
                }
            }

            //Hub with multiple ports
            else {
                const hub = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName: "Hub", type: "Hub" });

                for (let j = 0; j < devices.length; j++) {
                    if (devices[i].vendorId === devices[j].vendorId && devices[i].productId === devices[j].productId) {
                        const device = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: (manufacturer === "(Standard USB HUBs)" ? "Hub" : "Device") });
                        hub.childrens.push(device);
                    }
                }
                appearance[index] = 0;
                this.root.childrens.push(hub);
            }
        }
        //New disconnected device type
        for (let i = 0; i < this.removedNodes.length; i++) {
            const { vendorId, productId, deviceName, manufacturer } = this.removedNodes[i];
            const hub = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName: `${deviceName}'s hub`, type: "Hub" });
            const device = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: "Device", isAvailable: "Disconnected" });
            hub.childrens.push(device);
            this.root.childrens.push(hub);
        }
    }

    create_grouped_by_type_root(devices) {
        const devicesGroup = new CustomNode({ id: this.nextId++, type: "Devices", deviceName: "Devices" });
        const hubs = new CustomNode({ id: this.nextId++, type: "Hubs", deviceName: "Hubs" });

        for (let i = 0; i < devices.length; i++) {
            const { vendorId, productId, deviceName, manufacturer } = devices[i];

            if (manufacturer === "(Standard USB HUBs)") {
                const node = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: "Hub" });
                hubs.childrens.push(node);
            } else {
                const device = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: "Device" });
                devicesGroup.childrens.push(device);
            }
        }

        for (let i = 0; i < this.removedNodes.length; i++) {
            const { vendorId, productId, deviceName, manufacturer } = this.removedNodes[i];
            const device = new CustomNode({ id: this.nextId++, vendorId, productId, deviceName, type: "Device", isAvailable: "Disconnected" });
            devicesGroup.childrens.push(device);
        }

        this.typeRoot.childrens.push(devicesGroup);
        this.typeRoot.childrens.push(hubs);
    }

    count_appearance(devices) {
        const appearance = {};

        //Filling appearance object
        for (let i = 0; i < devices.length; i++) {
            const index = devices[i].vendorId + devices[i].productId;
            if (appearance[index])
                appearance[index]++;
            else
                appearance[index] = 1;
        }

        return appearance;
    }

    cleanData() {
        this.root = new CustomNode({ id: 1, type: "Server", deviceName: "Server" });

        this.typeRoot = new CustomNode({ id: 2, type: "Server", deviceName: "Server" });

        this.nextId = 3;
    }

    add(device) {
        if (this.removedNodes.length > 0) {
            const result = this.removedNodes.filter(removed => removed.vendorId !== device.vendorId && removed.productId !== device.productId)
            this.removedNodes = result;
        }
    }

    remove(device) {
        this.removedNodes.push(device);
    }
}

module.exports = new Tree();