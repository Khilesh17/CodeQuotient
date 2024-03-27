const {addTask, displayTasks, deleteLastTask, updateTask} = require('./taskManager');

addTask("Complete task 1");
addTask("Complete task 2");

displayTasks();
deleteLastTask();
displayTasks();

updateTask(1, "Updated task 1");
updateTask(5, "Updated task 5"); //checking edge case

displayTasks();
deleteLastTask();
deleteLastTask(); // Checking edge case
displayTasks(); // Checking edge case
