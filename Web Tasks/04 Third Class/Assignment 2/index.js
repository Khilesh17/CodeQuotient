const fs = require('fs');
const path = require('path');
const fsExtra = require("fs-extra"); // extermal module 

// if folder doesn't exist then well create the folder
function createDirectoryIfNotExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}


function moveFilesByExtension(sourceDir) {
    fs.readdir(sourceDir, (error, files) => {
        if (error) {
            console.error('Error reading the Provided Directory : ', error);
            return;
        }

        // Iterating over all the files of the source Directory
        for (let i = 0; i < files.length; i++){

            const file = files[i];

            const extension = path.extname(file);
            const destinationDir = path.join(sourceDir, extension.substring(1)); // substring for removing dot 

            // if the folder is not created then we have to create it first
            createDirectoryIfNotExists(destinationDir);

            const sourceFilePath = path.join(sourceDir, file);           // assignment2 -> files -> file.ext
            const destinationFilePath = path.join(destinationDir, file); // assignment2 -> files -> ext -> file.ext

            // Now Moving the file or if we say logically we are just renaming the directory of the current file 
            // fsExtra.move -> we can use this also for moving the files
            fs.rename(sourceFilePath, destinationFilePath, (err) => {
                if (err) {
                    console.error(`Error moving file ${file} to ${destinationDir} : `, err);
                }
                else {
                    console.log(`File ${file} moved to ${destinationDir}`);
                }
            });
        }
    });
}


const filesPath = path.join(__dirname, 'files');
moveFilesByExtension(filesPath);
