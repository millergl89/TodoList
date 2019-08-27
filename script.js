//TODO List and related methods
var todoList = {
  todos: [],
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      isComp: false
    });
  },
  changeTodos: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    this.todos[position].isComp = !this.todos[position].isComp
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //Get number of completed todos
    this.todos.forEach(function(todo) {
      if (todo.isComp === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      //Case 1 if everything is true, make everything false
      if (totalTodos === completedTodos) {
        todo.isComp = false;
        //Case 2: Otherwise make everything false
      } else {
        todo.isComp = true;
      };
    });
  }
};


//button handlers
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoText');
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPosition');
    var changeTodoTextInput = document.getElementById('changeTodoText');
    todoList.changeTodos(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodos(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
}

//Everything to do with what the user see's on screen, shows Todo List.
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    //clear Unordered List
    todosUl.innerHTML = '';
    //for each element in Todo List...
    todoList.todos.forEach(function(todo, position) {
      //create a list element
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      if (todo.isComp === true) {  
         todoTextWithCompletion = '(x) ' + todo.todoText;
       } else {
       todoTextWithCompletion = '( ) ' + todo.todoText;
     };
     //assign list element an id
     todoLi.id = position;
     todoLi.textContent = todoTextWithCompletion;
     todoLi.appendChild(view.createDeleteButton())
     todosUl.appendChild(todoLi);
    });
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton'
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    //Delete button event listener
    todosUl.addEventListener('click', function(event) {
      //Get element that was clicked on
      var elementClicked = event.target;

      //Check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};
view.setUpEventListeners();