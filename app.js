//Selectors
const $input = document.querySelector(".todo-input");
const $button = document.querySelector(".todo-button");
const $todolist = document.querySelector(".todo-list");
const $filter = document.querySelector(".filter-todo");

//Event Listeners
$button.addEventListener("click", addTodo);
$todolist.addEventListener("click",complecteCheck);
$todolist.addEventListener("click",trashCheck);
$filter.addEventListener("click",filterTodo);
document.addEventListener('DOMContentLoaded',getTodos);

//Function
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = $input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //SAVE LOCALSTORAGE
    saveLocalTodos($input.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn"); 
    todoDiv.appendChild(trashButton);
    
    //APPEND TO LIST
    $todolist.appendChild(todoDiv);

    //CLEAR TODO INPUT
    $input.value = "";
}

function complecteCheck (e){
    const item = e.target;
    if(item.classList == "complete-btn") {
        item.parentElement.classList.toggle("complete");
    }
}

function trashCheck (e){
    const item = e.target;
    if(item.classList == "trash-btn") {
        item.parentElement.remove();
        removeLocalTodos(item.parentElement);
    }
}

function filterTodo(e){
    const todos = $todolist.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('complete')){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('complete')){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {    //저장소가 비어있으면 배열을 비워둠
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));  //저장소에 key=todos인 값이 있으면 todos 배열에 저장
    }
    todos.push(todo);      //새로 입력된 todo값을 todos배열에 저장
    localStorage.setItem('todos',JSON.stringify(todos));    //todos 배열을 저장소에 저장 
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null) {    
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));  
    }

    todos.forEach(function(todo){
    //Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn"); 
    todoDiv.appendChild(trashButton);
    
    //APPEND TO LIST
    $todolist.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {    
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));  
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}