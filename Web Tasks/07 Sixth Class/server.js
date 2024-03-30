const http = require('http');
const fs = require('fs');
const path = require('path');


const dataFile = path.join(__dirname, "file.json");
const data = JSON.parse(fs.readFileSync(dataFile));


const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log('URL : ', url);
    console.log("req.headers.host : ", req.headers.host);

    if (req.url.startsWith('/User')) {

        const userIds = parseInt(url.searchParams.get('id'));

        if (userIds >= 0 && userIds < data.length) {

            const result = data.slice(0, userIds + 1);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                data: result
            }));
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: "User Not Found"
            }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            message: "Invalid Path"
        }));
    }
});


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
