const router = require("express").Router();
const usbDetect = require("usb-detection");
const Tree = require("./../models/Tree");

usbDetect.startMonitoring();

let client = null;

//return root node of all devices and hubs
router.get("/", async (req, res) => {
  try {
    usbDetect.find(function (err, devices) {
      client = req.app.get('updateSocket');

      Tree.create_tree(devices);
      Tree.create_grouped_by_type_root(devices);
      res.send({ root: Tree.root, typeRoot: Tree.typeRoot });
    });
  } catch (err) {
    res.status(400).send("Fetching Error");
  }



});

usbDetect.on('add', function (device) {
  if (client)
    client.send(`${device.deviceName} has been connected`);
  Tree.add(device);
});

usbDetect.on('remove', function (device) {
  if (client)
    client.send(`${device.deviceName} has been disconnected`);
  Tree.remove(device);
});


module.exports = router;
