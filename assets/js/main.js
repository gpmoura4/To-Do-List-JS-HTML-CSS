const newTaskButton = document.querySelector('.new-task-button');
const inputUser = document.querySelector('.task-input');
const result = document.querySelector('.result');
let taskArray = [];
inputUser.focus(); //Focando no input de entrada assim q a página é carregada
getSavedTasks();

function clearsInput() {
    inputUser.value = '';
    inputUser.focus();
}

function createsParagraph() {
    const paragraph = document.createElement('p');
    addClass(paragraph, 'paragraph-task');
    return paragraph;
}

function createsButton() {
    const button = document.createElement('button');
    addClass(button, 'btn-task');
    button.innerHTML = 'Delete';
    return button;
}

function removesTask(taskButton, taskArray) {
    taskButton.addEventListener('click', () => {
        var taskButtonFather = taskButton.parentNode;
        taskButton.remove();
        let index = taskArray.indexOf(taskButtonFather.innerHTML);
        if (index !== -1) {
            taskArray.splice(index, 1);
        }
        taskButtonFather.remove();
    });
}

function addClass(element, className) {
    element.classList.add(className);
}

function saveTasks(taskArray) {
    const JSONtasks = JSON.stringify(taskArray);
    localStorage.setItem('tasks', JSONtasks);
}

function getSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);

    taskList.forEach((value, index, array) => {
        createsTask(value);
    });
}

function createsCheckbox() {
    const checkbox = document.createElement('input');
    addClass(checkbox, 'checkbox-task');
    checkbox.setAttribute('type', 'checkbox');
    return checkbox;
}

function createsTask(task) {
    //Retirando espaços em branco
    const newTask = task.trim();

    if (!newTask) {
        alert('Dados inválidos.');
        return;
    }
    //Verifca se a task já existe antes de criar
    if (!taskArray.includes(newTask)) {
        taskArray.push(newTask);
        const paragraph = createsParagraph();
        var checkbox = createsCheckbox();
        var taskButton = createsButton();
        paragraph.appendChild(checkbox);
        paragraph.innerHTML += task;
        paragraph.appendChild(taskButton);
        result.appendChild(paragraph);
    }
    //Salvando as tarefas para reuso
    saveTasks(taskArray);
    clearsInput();
    // removesTask(taskButton, taskArray);
}

newTaskButton.addEventListener('click', () => {
    createsTask(inputUser.value);
});

inputUser.addEventListener('keypress', (e) => {
    //Verificando se o espaço foi pressionado 
    if (e.keyCode === 13) {
        createsTask(inputUser.value, taskArray);
    }
});

//Apagando tarefas
document.addEventListener('click', (e) => {
    const element = e.target; //elemento sendo clicado
    if (element.classList.contains('btn-task')) {

        //Pegando o elemento pai do botão clicado
        var taskButtonFather = element.parentNode;
        //Removendo o checkbox
        const currentInput = taskButtonFather.querySelector('input');
        console.log(taskButtonFather);
        currentInput.remove();

        //Removendo o botao delete para sobrar apenas o conteudo da task
        element.remove();

        //Removendo o elemento do vetor de tasks 
        let index = taskArray.indexOf(taskButtonFather.innerHTML);
        if (index !== -1) {
            taskArray.splice(index, 1);
        }
        //Removendo o conteúdo restando da task
        taskButtonFather.remove();
        saveTasks(taskArray);
    }
});





