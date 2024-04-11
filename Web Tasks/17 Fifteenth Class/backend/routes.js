const fs = require("fs").promises;
const path = require('path');

const filePath = path.join(__dirname, "task.json");
const allDeletedTaskFilePath = path.join(__dirname, "deletedTask.json");

// Creating the routes object
const routes = {
    "/tasks": {
        "GET": async (req, res) => {
            try {
                const tasks = JSON.parse(await fs.readFile(filePath, "utf-8"));

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    message: "Data Fetched Successfully",
                    Tasks: tasks
                }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    message: "Not able to fetch the Tasks",
                    error: err
                }));
            }
        },

        "POST": async (req, res) => {
            try {
                const tasks = JSON.parse(await fs.readFile(filePath, "utf-8"));

                const task = JSON.parse(req.body);

                //if there is no task from the req for updation the failure response
                if (!task) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        success: false,
                        message: "No task has been received from the request body"
                    }));
                    return;
                }

                //checking the task with same id exist or not
                const id = task.id;
                const taskIndex = tasks.findIndex((task) => task.id === id);

                if (taskIndex !== -1) {
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        success: false,
                        message: "Task with same id is already exist so please provide the unique ID"
                    }));
                    return;
                }

                //Updating the task
                tasks.push(task);

                //Now updating the file
                await fs.writeFile(filePath, JSON.stringify(tasks));

                //Sending the successfull response
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    message: "Data Posted Successfully",
                    Task: task
                }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    message: "Not able to Post the Tasks",
                    error: err
                }));
            }
        },

        "DELETE": async (req, res) => {
            try {
                
                const tasks = JSON.parse(await fs.readFile(filePath, "utf-8"));

                const { id } = JSON.parse(req.body);

                if (!id) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        success: false,
                        message: "Task ID required for deletion of Task"
                    }));
                    return;
                }

                //Finding the task for deletion
                const deleteTaskIndex = tasks.findIndex((task) => task.id === id);

                if (deleteTaskIndex === -1) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        success: false,
                        message: "Task not found"
                    }));
                    return;
                }

                //Now finding the deleted task and saving it into seperate file
                const deleteTask = tasks[deleteTaskIndex];
                console.log("Delete Task : ", deleteTask);
                
                //extracting all the deleted tasks
                const allDeletedTasks = JSON.parse(await fs.readFile(allDeletedTaskFilePath, "utf-8"));
                // console.log("All Deleted task : ", allDeletedTasks);


                //Now updating the deleted task list;
                allDeletedTasks.push(deleteTask);

                //Now updatinng the file of deleted task
                await fs.writeFile(allDeletedTaskFilePath, JSON.stringify(allDeletedTasks));

                //Now finally Updating the main list
                const updatedTasks = tasks.filter((task) => task.id !== id);
                await fs.writeFile(filePath, JSON.stringify(updatedTasks));

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    message: "Task Deleted Successfully",
                    Tasks: updatedTasks,
                    deletedTasks: allDeletedTasks
                }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    message: "Not able Delete the Tasks",
                    error: err
                }));
            }
        },

        "PUT": async (req, res) => {
            try {

                const tasks = JSON.parse(await fs.readFile(filePath, "utf-8"));

                const body = JSON.parse(req.body);
                const { id } = body;

                if (!id) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        success: false,
                        message: "Task ID required for Updation of Task"
                    }));
                    return;
                }

                const indexToChange = tasks.findIndex((task) => task.id === id);

                if (indexToChange === -1) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        success: false,
                        message: "There is no such task exist with Provided Task ID"
                    }));
                    return;
                }

                tasks[indexToChange] = { ...tasks[indexToChange], ...body };

                await fs.writeFile(filePath, JSON.stringify(tasks));

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    message: "Task Updated Successfully",
                    Tasks: tasks
                }));
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: false,
                    message: "Not able to Update the Tasks",
                    error: err
                }));
            }
        }
    }
};


module.exports = routes;