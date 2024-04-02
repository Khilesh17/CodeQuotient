const dgram = require('dgram');
const client = dgram.createSocket('udp4');


//For reading the i/p
const readline = require('readline');
const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



input.question('Enter message: ', (message) => {
    client.send(message, 3000, 'localhost', (err) => {
        if (err) {
            console.error('Error sending message : ', err);
        }
        else {
            console.log('Message sent to server');
        }
    });

    client.on('message', (msg) => {
        console.log(`Received message From the server : ${msg}`);
        input.close();
        client.close();
    });
});
