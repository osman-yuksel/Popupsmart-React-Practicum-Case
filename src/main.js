const url = "https://630f50ec37925634188c9818.mockapi.io/todos";
let todoContainer = document.querySelector(".todo-container");
const addButton = document.getElementById("add-todo-button");
const addContent = document.getElementById("add-todo-content");
addButton.addEventListener("click", () => { AddToDo(addContent.value); })

async function GetToDos(){
    await fetch(url).then(res => res.json())
    .then(todos => {todos.map((todo) => { 
        
        const element = document.createElement("div");
        element.classList.add("todo");
        if(todo.isCompleted) element.classList.add("completed-todo");
        element.setAttribute("data-id",todo.id);
        
        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = todo.isCompleted;
        completedCheckbox.addEventListener("change", (element) => { UpdateToDo(element.target.parentNode) })
        element.appendChild(completedCheckbox);

        
        const todoContent = document.createElement("p");
        todoContent.innerHTML = `${todo.id} ${todo.content}`;
        element.appendChild(todoContent);
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = 'X';
        deleteButton.type = "button";
        deleteButton.addEventListener("click", (element) => { DeleteToDo(element.target.parentNode.dataset.id) });
        element.appendChild(deleteButton);

        todoContainer.insertBefore(element, todoContainer.firstChild) })});
}

function GetButton(element){
    console.log(element.target);
}

async function AddToDo(todoContent){
    const todo = {
        content: todoContent,
        isCompleted: false
    }

    const options = {    
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch(url, options)
    .then(res => res.json())
    .then((res) => { console.log(res); todoContainer.innerHTML = ''; GetToDos(); });
}

async function DeleteToDo(todoId){
    const options = {    
        method: "DELETE",
    }
    
    fetch(url + '/'+ todoId, options)
    .then(res => res.json())
    .then((res) => { console.log(res); todoContainer.innerHTML = ''; GetToDos(); });
}

async function UpdateToDo(element){
    const childs = element.childNodes;
    const todo = {
        isCompleted: childs[0].checked,
        content: childs[1].innerHTML,
        id: element.dataset.id
    }

    const options = {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url + '/' + element.dataset.id, options)
    .then(res => res.json())
    .then((res) => { console.log(res); todoContainer.innerHTML = ''; GetToDos(); })
}

GetToDos();

