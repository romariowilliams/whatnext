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
  if(htmlstring == "<br><br>No tasks yet.") {  document.getElementById("list-container").innerHTML ='';}

  todoList.push(task);
  createDiv(task);
  saveTodoList();
}

function createDiv(task){
   var todoContainer = document.createElement('div');
   todoContainer.id="task";
   var todoElement = document.createElement('div');
   todoElement.className = 'todo-element';
   todoElement.id = "task"+todoList.length-1;
   var todoRemove = document.createElement('div');
   todoRemove.className='remove-task';
   todoRemove.id =todoList.length-1;
   todoElement.innerHTML = task;
   todoRemove.innerHTML = 'x';
   todoRemove.setAttribute('onclick','removeTask(this.id);');
   todoContainer.appendChild(todoElement);
   todoContainer.appendChild(todoRemove);
   todoContainer.setAttribute('onclick','callTask(lastChild.id);');
   addDivToList(todoContainer);
}

function displaySavedDiv(task,i){
  var todoContainer = document.createElement('div');
  todoContainer.id="task";
  var todoElement = document.createElement('div');
  todoElement.className = 'todo-element';
  todoElement.id = "task"+i;
  var todoRemove = document.createElement('div');
  todoRemove.className='remove-task';
  todoRemove.id =i;
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
    document.getElementById("list-container").innerHTML='';
    for (i=0; i< todoList.length; i++){
    displaySavedDiv(todoList[i],i);
    }
    displayEmptyMsg();
  }

  function callTask(taskIndex) {
    if (VERBOSE) alert (taskIndex);
  }
/*
  function strikeTask(taskIndex){
    var currentHTML;
    currentHTML = document.getElementById("task"+taskIndex).innerHTML;
    document.getElementById("task"+taskIndex).innerHTML= '<span style=color:grey;"><del>'+currentHTML+'</del></span>';
  }
*/
function displayEmptyMsg() {
  if (todoList.length==0) {
     document.getElementById("list-container").innerHTML = '<br><br>Add a task to begin.';
  }
}

function removeTask(taskIndex) {
  if (VERBOSE) alert (taskIndex);
  if (taskIndex > -1) {
    todoList.splice(taskIndex, 1);
  }
  saveTodoList();
  displaySavedList();

}
