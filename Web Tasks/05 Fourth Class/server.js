const http = require("http");
const url = require("url");
const PORT = 4000;

const user = ["Khilesh", "Nilesh", "Raju", "Hero"];

const server = http.createServer((req, res) => {
    
    const requestedURL = req.url;

    if (requestedURL.startsWith('/User/')) {
        const index = parseInt(requestedURL.split('/')[2]);
        
        if (index >= 0 && index < user.length) {
            const name = user[index];
            console.log(`User at Index ${index} : ${name}`);

            //Response Bhej rahe hai
            res.end(JSON.stringify({
                success: true,
                message: `User at Index ${index} : ${name}`
            }));
        }
        else {
            console.log("User Not Found");
            res.end(JSON.stringify({
                success: false,
                message: 'User not found'
            }));
        }
    }
    else {
        console.log("Invalid EndPoint");
        res.end(JSON.stringify({
            success: false,
            message: 'Invalid Endpoint'
        }));
    }
});


server.listen(PORT, () => {
    console.log(`Server is Running at ${PORT} PORT`);
})