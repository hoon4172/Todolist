//Selectors
const $input = document.querySelector(".todo-input");
const $button = document.querySelector(".todo-button");
const $todolist = document.querySelector(".todo-list");
//Event Listeners
$button.addEventListener("click", addTodo);

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

    $todolist.appendChild(todoDiv);
    $input.value = "";

}