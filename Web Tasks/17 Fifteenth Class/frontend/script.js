const input = document.querySelector(".taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const styleButton = document.querySelector("#styleButton");
const cloneButton = document.querySelector("#cloneButton");
const taskList = document.querySelector(".taskList");


const serverURL = "http://localhost:3000/tasks";

//This is for loading local storage task
let localTasks = JSON.parse(localStorage.getItem("values")) || [];

document.addEventListener("DOMContentLoaded", initTasks);
// onload = initTasks();

async function initTasks() {

    if (localTasks.length === 0) {
        const res = await fetch(serverURL);

        //Bakcend se data fetch hoga tabhi local storage me store kraege
        if (res.ok) {
            localTasks = await res.json();
            localTasks = localTasks["Tasks"];
            // console.log("Local Storge Tasks : ", localTasks);
            localStorage.setItem("values", JSON.stringify(localTasks));
        }
    }

    //Local storage se data nikaal kar list bana re task ki
    localTasks.forEach(task => {
        createTask(task);
    });
}



//Generalizing Task Creation
function createTask(taskInfo) {

    // console.log("Task info : ", taskInfo);
    const id = taskInfo.id;
    const value = taskInfo.Task;

    //Creating task List
    const task = document.createElement("li");
    task.textContent = value;
    task.classList.add("task");

    task.addEventListener("click", () => {
        if (task.classList.contains("done")) {
            task.classList.remove("done");
        }
        else {
            task.classList.add("done");
        }
    })

    task.addEventListener("dblclick", async () => {
        try {
            const deleteResponse = await fetch(serverURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": id })
            });

            if (deleteResponse.ok) {
                // Deleting from local storage
                localTasks = localTasks.filter(taskObj => taskObj.id !== id);
                localStorage.setItem("values", JSON.stringify(localTasks));

                // Removing task from the list
                taskList.removeChild(task);
            }
            else {
                console.error("Failed to delete task. Server returned status : ", deleteResponse.status);
            }
        }
        catch (error) {
            console.error("Error occurred while deleting task:", error);
        }
    });


    taskList.appendChild(task);

}

async function addTask() {

    const value = input.value;
    const task = {
        id: Date.now(),
        Task: value
    }

    // Checking
    if (value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    //Before Creation we have to store it in the server
    const postResponse = await fetch(serverURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    //Sercver par data sacve hoga tab hi website par show karege
    if (postResponse.ok) {
        localTasks.push(task);
        localStorage.setItem("values", JSON.stringify(localTasks));

        createTask(task);
    }

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
