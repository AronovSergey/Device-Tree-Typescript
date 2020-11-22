import { CustomNodeInterface } from "./CustomNodeInterface";

function CustomNode(props: CustomNodeInterface) {
    const {
        id = 0,
        vendorId,
        productId,
        deviceName,
        type = "Device",
        isAvailable = "Available",
        childrens = [],
    } = props;

    this.id = id;
    this.vendorId = (vendorId === undefined) ? null : vendorId;
    this.productId = (productId === undefined) ? null : productId;
    this.deviceName = deviceName;
    this.type = type;
    this.isAvailable = isAvailable
    this.childrens = childrens
}

module.exports = CustomNode;