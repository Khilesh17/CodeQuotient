const net = require('net');
const readline = require('readline');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Create a TCP client
const client = new net.Socket();

// Connect to the server
client.connect(3000, 'localhost', () => {
    console.log('Connected to server');

    input.question('Enter message: ', (message) => {

        setTimeout(() => {
            client.write(message);
            console.log('Message sent to server');
        }, 3000)


        client.on('data', (data) => {
            console.log(`Received reversed message from server: ${data}`);
            
            // Close the client connection
            client.end();
            input.close();
        });
    });
});


client.on('close', () => {
    console.log('Connection closed');
});
