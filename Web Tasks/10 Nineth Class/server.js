const http = require('http');
const url = require('url');
const PORT = 3000;
const routes = require("./routes");

// Define serverHandler before creating the server
const serverHandler = (req, res) => {
    const parsedURL = url.parse(req.url, true);
    const path = parsedURL.pathname;

    req.query = parsedURL.query;

    // Buffer for data event
    let body = "";

    req.on('data', (data) => {
        body += data; // Append data to body buffer
    });

    req.on('end', async () => {
        req.body = body;

        if (routes[path] && routes[path][req.method]) {
            await routes[path][req.method](req, res); // Await the route handler
        }
        else {
            console.log("Invalid Path");
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Invalid Path");
        }
    });
};


// Create the server after defining serverHandler
const server = http.createServer(serverHandler);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
