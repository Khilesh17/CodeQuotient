let tasks = {};
let nextTaskId = 1;

function addTask(task) {
    const taskId = nextTaskId++;
    tasks[taskId] = task;
}

function deleteLastTask() {
    const lastTaskId = nextTaskId - 1;

    // If theres is no task present then we dont have to print anything
    if (lastTaskId) {
        delete tasks[lastTaskId];
        nextTaskId--; //after deletion we have to update nextTaskId
    }
    else {
        console.log("No task exist");
    }
}

function updateTask(taskId, updatedTask) {

    // TaskId Present hogi tab hi Update Karege
    if (tasks[taskId]) {
        tasks[taskId] = updatedTask;
    }
    else {
        console.log("Task with ID " + taskId + " does not exist.");
    }
}

function displayTasks() {

    if (nextTaskId == 1) {
        console.log("No Task is Present To display.");
        return;
    }

    console.log("Printing all Tasks : ");
    for (const taskId in tasks) {
        console.log(taskId + ": " + tasks[taskId]);
    }
}

module.exports = { addTask, deleteLastTask, updateTask, displayTasks };
