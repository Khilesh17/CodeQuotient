//TCP : transmission control protocol
//TCP is a connection oriented , reliable protocol
//TCP is slower than UDP
//TCP is reliable and sends and recieves acknowledgement
//HTTP , SMTP, uses TCP


const net = require("net");
const server = net.createServer();

server.listen(3000, "localhost", () => {
    console.log("Connection established");
})


//Writing one message to all the user
let sockets = []; // all users Socket

server.on("connection", (socket) => {
    console.log("New Connection made");

    socket.on("data", (data) => {
        console.log("New message : ", data.toString());

        sockets.forEach((skt) => {
            skt.write(data);
        })
    })

    socket.on("close", () => {
        console.log("Connection Closed");
        sockets = sockets.filter((s) => s != socket);
    })

    console.log("Hello From server...");
})



