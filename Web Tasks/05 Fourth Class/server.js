const http = require("http");
const PORT = 4000;

const user = ["Khilesh", "Nilesh", "Raju", "Hero"];

const server = http.createServer((req, res) => {
    
    const requestedURL = req.url;

    console.log("URL : ", requestedURL);
    console.log("Index 0 : ", requestedURL.split('/')[0]);
    console.log("Index 1 : ", requestedURL.split('/')[1]);
    console.log("Index 2 : ", requestedURL.split('/')[2]);


    if (requestedURL.startsWith('/User/')) {
        const index = parseInt(requestedURL.split('/')[2]);
        
        if (index >= 0 && index < user.length) {
            const name = user[index];
            console.log(`User at Index ${index} : ${name}`);

            //Response Bhej rahe hai
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: `User at Index ${index} : ${name}`
            }));
        }
        else {
            console.log("User Not Found");
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'User not found'
            }));
        }
    }
    else {
        console.log("Invalid EndPoint");
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            message: 'Invalid Endpoint'
        }));
    }
});


server.listen(PORT, () => {
    console.log(`Server is Running at ${PORT} PORT`);
})