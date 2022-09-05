const url = "https://630f50ec37925634188c9818.mockapi.io/todos";
let todoContainer = document.querySelector(".todo-container");
const addButton = document.getElementById("add-todo-button");
const addContent = document.getElementById("add-todo-content");
const addToDoLoadingAnim = document.querySelector(".add-todo-loading-anim");
addButton.addEventListener("click", () => { AddToDo(addContent.value); })

async function GetToDos(){
    await fetch(url).then(res => res.json())
    .then((todos) => { todoContainer.innerHTML = ''; todos.map((todo) => { 

        addContent.value = "";
        addToDoLoadingAnim.classList.add("hidden");
        
        const element = document.createElement("div");
        element.classList.add("todo");
        if(todo.isCompleted) element.classList.add("completed-todo");
        element.setAttribute("data-id",todo.id);

        const loadingAnim = document.createElement("img");
        loadingAnim.src = "src/icons/Rolling-1s-200px.svg";
        loadingAnim.classList.add("loading-anim");
        const loadingAnimContainer = document.createElement("div");
        loadingAnimContainer.classList.add("loading-anim-container");
        loadingAnimContainer.classList.add("hidden");
        loadingAnimContainer.appendChild(loadingAnim);
        element.appendChild(loadingAnimContainer);

        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = todo.isCompleted;
        completedCheckbox.addEventListener("change", (element) => { UpdateToDo(element.target.parentNode, "") })
        element.appendChild(completedCheckbox);

        
        const todoContent = document.createElement("p");
        todoContent.innerHTML = todo.content;
        element.appendChild(todoContent);
        
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.type = "button";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", (element) => { EditMode(element.target.parentNode) });
        element.appendChild(editButton);
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = 'X';
        deleteButton.type = "button";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (element) => { DeleteToDo(element.target.parentNode) });
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

    addToDoLoadingAnim.classList.remove("hidden");
    
    fetch(url, options)
    .then(res => res.json())
    .then((res) => { console.log(res); GetToDos(); });
}

async function DeleteToDo(element){
    const options = {    
        method: "DELETE",
    }
    
    element.childNodes[0].classList.remove("hidden");

    fetch(url + '/'+ element.dataset.id, options)
    .then(res => res.json())
    .then((res) => { console.log(res); GetToDos(); });
}

async function UpdateToDo(element, todoContent){
    const childs = element.childNodes;
    const contentCheck = todoContent === "" ? childs[2].innerHTML : todoContent;
    const todo = {
        isCompleted: childs[1].checked,
        content: contentCheck,
        id: element.dataset.id
    }

    const options = {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        }
    }

    childs[0].classList.remove("hidden");

    fetch(url + '/' + element.dataset.id, options)
    .then(res => res.json())
    .then((res) => { console.log(res); GetToDos(); })
}

function EditMode(element){
    const childs = element.childNodes;
    
    const editText = document.createElement("input");
    editText.type = "text";
    editText.classList.add("todo-edit-text");
    editText.value = childs[2].innerHTML;
    element.replaceChild(editText, childs[2]);

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.innerHTML = "Save";
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", (element) => { SaveToDo(element.target.parentNode) })
    element.replaceChild(saveButton, childs[3]);

    const discardButton = document.createElement("button");
    discardButton.innerHTML = "Discard";
    discardButton.type = "button";
    discardButton.classList.add("discard-button");
    discardButton.addEventListener("click", () => { childs[0].classList.remove("hidden"); GetToDos() });
    element.replaceChild(discardButton, childs[4]);

    const editIcon = document.createElement("img");
    editIcon.src = "src/icons/Pulse-1s-64px.svg";
    editIcon.classList.add("edit-icon");
    const editIconContainer = document.createElement("div");
    editIconContainer.classList.add("edit-icon-container");
    editIconContainer.appendChild(editIcon);
    element.replaceChild(editIconContainer, childs[1]);
    
    console.log(element);
}

function SaveToDo(element){
    UpdateToDo(element, element.childNodes[2].value);
}
GetToDos();

