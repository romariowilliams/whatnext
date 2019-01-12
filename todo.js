var todoList = [];
var VERBOSE = false;

function inputTodo(){
              var taskInput;
              taskInput = document.getElementById("task-input").value;
              if (VERBOSE) alert (taskInput);
              if (taskInput==''){
                // alert("Your task cannot be blank");
              document.getElementById("task-input").value = 'Your task cannot be blank';
              }
              else {
                addToList(taskInput);
              }
              document.getElementById("task-input").value = '';
}

function addToList(task){
  todoList.push(task);
  createDiv(task);
  saveTodoList();
}

function createDiv(task){
   var todoElement = document.createElement('div');
   todoElement.id = "task";
   todoElement.innerHTML = task;
   addDivToList(todoElement);
}

function addDivToList(todoElement){
  document.getElementById("list-container").prepend(todoElement);
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
    createDiv(todoList[i]);
    }
  }
