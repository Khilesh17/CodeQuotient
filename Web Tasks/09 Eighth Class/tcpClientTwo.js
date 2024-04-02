const net = require("net");

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log("Connected to Server...");
})

setInterval(() => {
    client.write("This is user 2")
}, 5000);


client.on("data", (data) => {
    console.log("New Message : ", data);
});

client.on("close", () => {
    console.log("Clients Connection Closed");
});