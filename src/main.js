const url = 'https://630f50ec37925634188c9818.mockapi.io/todos';
let todoContainer = document.querySelector(".todo-container");
const addButton = document.getElementById("add-todo-button");
const addContent = document.getElementById("add-todo-content");
addButton.addEventListener("click", () => { AddToDo(url, addContent.value); })

async function GetToDos(url){
    await fetch(url).then(res => res.json())
    .then(todos => {todos.map((todo) => {todoContainer.insertBefore(document.createElement("div"), todoContainer.firstChild).innerHTML = `${todo.id} ${todo.content}`})});
}

async function AddToDo(url, todoContent){
    const todo = {
        content: todoContent,
        isCompleted: false,
    }

    const options = {    
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch(url, options)
    .then(res => res.json())
    .then((res) => {console.log(res); todoContainer.insertBefore(document.createElement("div"), todoContainer.firstChild).innerHTML = `${res.id} ${res.content}`});
}

async function DeleteToDo(url, todoId){
    const options = {    
        method: 'DELETE',
    }
    
    fetch(url + "/" + todoId, options)
    .then(res => res.json())
    .then((res) => {console.log(res);});
}

GetToDos(url);

