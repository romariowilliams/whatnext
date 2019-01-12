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
  /*for (i=0; i < todoList.length; i++){
      alert(todoList[i]);
  }
  */
   //document.getElementById("list-container").prepend('<div id="">task</div><br/>');

   var todoElement = document.createElement('div');
    todoElement.id = "task";
   todoElement.innerHTML = task;


 document.getElementById("list-container").prepend(todoElement);
 document.getElementById("list-container").prepend();
}

/*
function generateList(){
    for (i=0; i< todoList.length; i++){
      var task = todoList[i];

    }
  }
*/
