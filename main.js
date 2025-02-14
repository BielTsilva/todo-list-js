const container = document.getElementById('container');
const modal = document.getElementById('modal');
const taskInput = document.getElementById('task-name');
const taskList = document.getElementById('task-list');

const addTask = document.getElementById('add-task');
const closeModal = document.getElementById('close-modal');
const openModal = document.getElementById('open-modal');

const taskArray = [];

document.addEventListener("DOMContentLoaded", ()=> {
    loadTasks();
    renderList();
});

function renderList(){
    taskList.innerHTML = "";

    for (let i = 0; i < taskArray.length; i++) {
        const value = taskArray[i];
        const index = value.id;

        const newTask = `
        <li id="item-name">
            <p>${value.name}</p>
            <div id="item-options">
                <button id="delete-btn" onclick="deleteTask(${index})" >X</button>
                <button id="edit-btn" onclick="editTask(${index})">E</button>
            </div>
        </li>
        `;

        taskList.innerHTML += newTask;
    }
}

addTask.addEventListener('click', ()=> {
    const value = taskInput.value;
    if(value === "") return;
    taskArray.push({ id: taskArray.length, name: `${value}`});

    saveTasks();
    renderList();
    closeModalWindow();
    
    taskInput.value = "";
});

openModal.addEventListener('click', ()=> {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', closeModalWindow);

function deleteTask(index){
    const taskIndex = taskArray.findIndex(task => 
        task.id === index
    );
    if(taskIndex !== -1){
        taskArray.splice(taskIndex, 1);
        saveTasks();    
        renderList();
    }
}

function editTask(index){
    const taskIndex = taskArray.findIndex(task => task.id === index);
    const newName = prompt("Edit Task:", taskArray[taskIndex].name);
    if(newName !== null && newName.trim() !== ""){
        taskArray[taskIndex].name = newName;
        saveTasks();
        renderList();
    }
}

function closeModalWindow(){
    modal.style.display = 'none';
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTasks(){
    const storedTasks = localStorage.getItem("tasks");
    if(storedTasks){
        taskArray.push(...JSON.parse(storedTasks));
    }
}