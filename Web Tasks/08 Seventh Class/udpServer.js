//UDP is connection less protocol
//fast data serving
//theres no acknowledgement send from the receiver
//connection is not secured 
//data loss hota hai


const dgram = require('dgram');

//for maintaining the connection we use sockets and it is full duplex commnication
const server = dgram.createSocket('udp4');


server.on('message', (msg, info) => {
    console.log(`Server received a 
    message : ${msg} from 
    PORT : ${info.port} and 
    Address : ${info.address}`);

    const msgForClient = `Thakyou Boss Message received and the message is ${msg}`;
    server.send(msgForClient, info.port, info.address, (err) => {
        if (err) {
            console.error('Error sending message:', err);
        } else {
            console.log('message sent to client');
        }
    });
});

server.on('listening', () => {
    console.log(`Server listening on PORT 3000`);
});

server.bind(3000);