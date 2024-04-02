const net = require("net");

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log("Connected to Server...");
})

client.write("Hello I am Client");

client.on("data", (data) => {
    console.log("New Message : ", data);
});

client.on("close", () => {
    console.log("Clients Connection Closed");
});