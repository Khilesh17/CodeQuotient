const input = document.querySelector(".taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const styleButton = document.querySelector("#styleButton");
const cloneButton = document.querySelector("#cloneButton");
const taskList = document.querySelector(".taskList");


//This is for loading local storage task
const localTasks = JSON.parse(localStorage.getItem("values")) || [];

document.addEventListener("DOMContentLoaded", initTasks);
// onload = initTasks();

function initTasks() {
    localTasks.forEach(task => {
        createTask(task);
    });
}



//Generalizing Task Creation
function createTask(value) {

    //Step 1 : creating the list item
    const task = document.createElement("li");

    // const task = `<li class="task"> ${input.value} </li>`;

    //Step 2 : Now iserting the content of the input
    task.textContent = value;

    //step 3 : adding the class 
    task.classList.add("task");

    //Step 4 : Adding Event listeners in each list item for task Done and Deletion
    task.addEventListener("click", () => {
        if (task.classList.contains("done")) {
            task.classList.remove("done");
        }
        else {
            task.classList.add("done");
        }
    })

    task.addEventListener("dblclick", () => {
        taskList.removeChild(task);
    })

    //Step 5 : Now inserting the list itme in the DOM
    // taskList.innerHTML = task;
    taskList.appendChild(task);
}

function addTask() {
    // Checking
    if (input.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    //Before creating the task we are storing the task in local storage
    localTasks.push(input.value);
    localStorage.setItem("values", JSON.stringify(localTasks));

    // Creating the task
    createTask(input.value);

    //Resetting the input
    input.value = "";
}

styleButton.addEventListener("click", () => {
    if (taskList.style.color === "black") {
        taskList.style.color = "white";
        taskList.style.fontWeight = "none";
    }
    else {
        taskList.style.color = "black";
        taskList.style.fontWeight = "bold";
    }
})


cloneButton.addEventListener("click", () => {
    const clonedList = taskList.cloneNode(true);
    taskList.insertAdjacentElement("afterend", clonedList);
})
