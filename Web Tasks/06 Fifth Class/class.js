const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "file.txt");
// const stream = fs.createReadStream(filePath);
const stream = fs.createReadStream(filePath, { highWaterMark: 100 }); // Reading 100 bytes of chunks


stream.on("open", () => {
    console.log("We are Starting to read the file");
})

stream.on("data", (chunk) => {
    console.log("Printing Chunk : ", chunk);
    console.log(chunk.toString());
})

stream.on("end", () => {
    console.log("End of the file");
})

