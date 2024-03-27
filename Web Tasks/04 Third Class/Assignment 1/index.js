//Parent file me saari files ka data bharna hai
const fs = require("fs");
const path = require('path');


//This method is not wroklng
// const filePaths = ["./files/first.txt", "./files/second.txt", "./files/third.txt"];
// const parentPath = "parent.txt";

const filePaths = [
    path.join(__dirname, 'files', 'first.txt'),
    path.join(__dirname, 'files', 'second.txt'),
    path.join(__dirname, 'files', 'third.txt'),
    path.join(__dirname, 'files', 'fourth.txt'),
    path.join(__dirname, 'files', 'fifth.txt'),
    path.join(__dirname, 'files', 'sixth.txt')
];
const parentPath = path.join(__dirname, 'parent.txt');


//For writing the data of all files
function writeFile(data) {
    
    //firstly combining the data from all file using new line
    const combinedData = data.join('\n');

    //Now writing in the parent file
    fs.writeFile(parentPath, combinedData, "utf8", (error) => {
        if (error) {
            console.log("Error Occured while writting to file : ", error);
        }
        else {
            console.log("Data writing done SuccessFully");
        }
    });
}

//Now Storing all the Content in seperate DS
function readFiles(filePaths) {

    const parentFileContent = [];
    let fileHasBeenRead = 0;

    //saare file me ek ek baar read karege and array m,e puish karege
    for (let i = 0; i < filePaths.length; i++) {
        
        const path = filePaths[i];

        fs.readFile(path, "utf8", (error, data) => {
            
            if (error) {
                console.error("Error Occured while Reading the File : ", error);
                return;
            }

            //Agar error nahi aya hai then saare content ko store karege
            parentFileContent.push(data);
            fileHasBeenRead++;
            console.log(`Data : ${data} pushed successFully`);

            // This condition is for handling asyncronicity
            if (fileHasBeenRead === filePaths.length) {
                console.log("Parent Content : ", parentFileContent);
                writeFile(parentFileContent);
            }
        });
    }
}

readFiles(filePaths);