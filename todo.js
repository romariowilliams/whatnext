var todoList = []; //create an array to store list of tasks
var initialMsg = "<br><br>Add a task to begin."; //initial message to display when task list is empty

function inputTodo(){
              var taskInput;
              taskInput = document.getElementById("task-input").value; //get text from inputbox
              if(taskInput ==''){ //check if input is blank
                document.getElementById("task-input").placeholder = 'Task cannot be blank';
              }
              else{
              addToList(taskInput);
              document.getElementById("task-input").value = ''; //clear the input box
              document.getElementById("task-input").placeholder = ''; //remove  'task cannot be blank' message if it was displayed
              }
}

function addToList(task){
  removeInitialMsg(); //check for initial "add task to begin" message and remove if displayed
  todoList.push(task);
  var taskID= todoList.length-1;
  createDiv(task,taskID);
  saveTodoList();
}

function removeInitialMsg(){
  var htmlstring = document.getElementById("list-container").innerHTML;
  if(htmlstring == initialMsg) {
      document.getElementById("list-container").innerHTML ='';
    }
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
  // function to perform when tasks are clicked
}

function displayEmptyMsg() {
     document.getElementById("list-container").innerHTML = initialMsg;
}

function removeTask(taskIndex) {
  if (taskIndex > -1) {
    todoList.splice(taskIndex, 1);
  }
  saveTodoList();
  displaySavedList();
}
