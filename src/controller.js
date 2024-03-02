class MasterController {
  #todoStorage;
  #todoListView;
  #todoList;
  #uniqueTodoNumber;

  constructor(todoListView, todoList, todoStorage) {
    this.#todoList = todoList;
    this.#todoListView = todoListView;
    this.#uniqueTodoNumber = 0;
    this.#todoStorage = todoStorage;
  }

  #generateUniqueTodoId() {
    this.#uniqueTodoNumber += 1;
    return this.#uniqueTodoNumber;
  }

  #updateStorage() {
    const todos = this.#todoList.getAllTodos();
    this.#todoStorage.store(todos);
  }

  #render() {
    const todos = this.#todoList.getAllTodos();
    this.#todoListView.render(todos);
  }

  #createTodo(todoTitle) {
    const todoId = this.#generateUniqueTodoId();
    this.#todoList.add(todoId, todoTitle);
    this.#updateStorage();
    this.#render();
  }

  #insertTodoItem(todoId, message) {
    this.#todoList.addTodoItem(todoId, message);
    this.#updateStorage();
    this.#render();
  }

  #toggleAlphabeticalSort(todoId) {
    this.#todoList.toggleAlphabeticalSort(todoId);
    this.#render();
  }

  #toggleSortDoneUndone(todoId) {
    this.#todoList.toggleSortDoneUndone(todoId);
    this.#render();
  }

  #deleteItem(todoId, todoItemId) {
    this.#todoList.removeTodoItem(todoId, todoItemId);
    this.#updateStorage();
    this.#render();
  }

  #changeMarkStatus(todoId, todoItemId) {
    this.#todoList.toggleMarkedStatus(todoId, todoItemId);
    this.#render();
  }

  #createAllTodos(todos) {
    todos.forEach(({ id, todoItems, title, sortAlphabetical, SortDoneUndone }) => {
      this.#todoList.add(id, title, sortAlphabetical, SortDoneUndone);
      this.#uniqueTodoNumber += 1;

      todoItems.forEach(({ message }) => {
        this.#todoList.addTodoItem(id, message);
      });
    });
  }

  start() {
    const todos = this.#todoStorage.getTodos();
    if (todos) {
      this.#todoListView.render(todos);
      this.#createAllTodos(this.#todoStorage.getTodos());
    }
    this.#todoListView.on('createTodo', (todoTitle) => this.#createTodo(todoTitle));
    this.#todoListView.on('delete', (todoId, todoItemId) =>
      this.#deleteItem(todoId, todoItemId)
    );
    this.#todoListView.on('toggleMark', (todoId, todoItemId) =>
      this.#changeMarkStatus(todoId, todoItemId)
    );
    this.#todoListView.on('addTodoItem', (todoId, message) =>
      this.#insertTodoItem(todoId, message)
    );
    this.#todoListView.on('toggleAlphabeticalSort', (todoId) =>
      this.#toggleAlphabeticalSort(todoId)
    );
    this.#todoListView.on('toggleDoneUndoneSort', (todoId) =>
      this.#toggleSortDoneUndone(todoId)
    );
    this.#todoListView.start();
  }
}
