const fs = require("fs");
const path = require("path");

fs.rename(path.join(__dirname, 'file.txt'), path.join(__dirname, 'newfile.txt'), (err) => {
    if (err) console.log("Error : ", err)
    else console.log("Rename SuccessFully")
})





