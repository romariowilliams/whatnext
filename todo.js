var todoList = [];
var VERBOSE = false;

function inputTodo(){
              var taskInput;
              taskInput = document.getElementById("task-input").value;
              if (VERBOSE) alert (taskInput);
              addToList(taskInput);
              document.getElementById("task-input").value = '';
}

function addToList(task){
  var htmlstring = document.getElementById("list-container").innerHTML;
  if(htmlstring == "<br><br>Add a task to begin.") {  document.getElementById("list-container").innerHTML ='';}

  todoList.push(task);
  var taskID= todoList.length-1;
  createDiv(task,taskID);
  saveTodoList();
}

function createDiv(task,taskID){
   var todoContainer = document.createElement('div');
   todoContainer.className="task";
   var todoElement = document.createElement('div');
   todoElement.className = 'todo-element';
   todoElement.id = "task"+taskID;
   var todoRemove = document.createElement('div');
   todoRemove.className='remove-task';
   todoRemove.id =taskID;
   todoElement.innerHTML = task;
   todoRemove.innerHTML = 'x';
   todoRemove.setAttribute('onclick','removeTask(this.id);');
   todoContainer.appendChild(todoElement);
   todoContainer.appendChild(todoRemove);
   todoContainer.setAttribute('onclick','callTask(lastChild.id);');
   addDivToList(todoContainer);
}

function addDivToList(todoContainer){
      document.getElementById("list-container").prepend(todoContainer);
}

function saveTodoList(){
  var todoStr = JSON.stringify(todoList);
  localStorage.setItem("todoList",todoStr);
}

function getTodoList(){
    var todoStr = localStorage.getItem("todoList");
    todoList= JSON.parse(todoStr);
    if (!todoList){
      todoList = [];
    }
}

function displaySavedList(){
    getTodoList();
    if (todoList.length==0) {
      displayEmptyMsg();
    }
    else {
      document.getElementById("list-container").innerHTML='';
      for (i=0; i< todoList.length; i++){
        createDiv(todoList[i],i);
      }
    }

}

function callTask(taskIndex) {
    if (VERBOSE) alert (taskIndex);
}

function displayEmptyMsg() {
     document.getElementById("list-container").innerHTML = '<br><br>Add a task to begin.';
}

function removeTask(taskIndex) {
  if (VERBOSE) alert (taskIndex);
  if (taskIndex > -1) {
    todoList.splice(taskIndex, 1);
  }
  saveTodoList();
  displaySavedList();
}
