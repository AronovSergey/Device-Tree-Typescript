const express = require("express");
const http = require('http');
const webSocket = require("ws");

const port = '12345';

// import middlewares
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var CORSMiddleware = require("./middlewares/CORSMiddleware");

// import Routes
var treeRouter = require("./routes/tree");

// return instance of the app
const app = express();

// setting up the middlewares
app.use(logger("dev"));
app.use("/api", CORSMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// setting the routes 
app.use("/api/v1.0/tree", treeRouter);

//store the port in Express
app.set('port', port);

//Create HTTP server.
var server = http.createServer(app);

//initialize the WebSocket server instance
var wss = new webSocket.Server({ server });
/**
 * WebSocket server.
 */
wss.on('connection', function (ws) {
    console.log("A new client Connected!");
    //WebSocket broadcasting option
    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === webSocket.OPEN)
                client.send(message)
        });
    })
});

/**
 * WebSocket client.
 */
const updateSocket = new webSocket(`ws://localhost:${port}`);
// Connection opened
updateSocket.addEventListener('open', function (event) {
    console.log('Updates channel is connected!');
});

app.set('updateSocket', updateSocket);


server.listen(port);