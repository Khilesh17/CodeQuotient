//tcp server bnana hai and command line arg se input lena hai
//and send karna hai server ko

//use Settime out for sending the msg


const net = require('net');

const server = net.createServer((socket) => {

    console.log('Client connected');


    socket.on('data', (data) => {
        console.log(`Received from client: ${data.toString()}`);
        socket.write("I am server and Message Received")
        console.log('Message sent to client');
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

// Start listening on port 8080
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
