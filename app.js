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
//Function
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = $input.value;
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
    }
}

function filterTodo(e){
    const todos = $todolist.childNodes;
    console.log("todos >> ", todos);
    console.log(e.target.value);
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
aa