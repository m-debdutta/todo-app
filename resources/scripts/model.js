class TodoItem {
  #id;
  #message;
  #markedStatus;

  constructor(id, message) {
    this.#id = id;
    this.#message = message;
    this.#markedStatus = false;
  }

  get id() {
    return this.#id;
  }

  get message() {
    return this.#message;
  }

  get markedStatus() {
    return this.#markedStatus;
  }

  toggleMarkedStatus() {
    this.#markedStatus = !this.#markedStatus;
  }
}

class Todo {
  #todoItems;
  #sortAlphabetical;
  #sortDoneUndone;
  #uniqueTodoItemNumber;

  constructor(sortAlphabetical = false, sortDoneUndone = false) {
    this.#todoItems = [];
    this.#sortAlphabetical = sortAlphabetical;
    this.#sortDoneUndone = sortDoneUndone;
    this.#uniqueTodoItemNumber = 0;
  }

  #generateTodoItemId() {
    this.#uniqueTodoItemNumber += 1;
    return this.#uniqueTodoItemNumber;
  }

  add(message) {
    const id = this.#generateTodoItemId();
    const todoItem = new TodoItem(id, message);
    this.#todoItems.unshift(todoItem);
  }

  toggleAlphabeticalSort() {
    this.#sortAlphabetical = !this.#sortAlphabetical;
  }

  toggleSortDoneUndone() {
    this.#sortDoneUndone = !this.#sortDoneUndone;
  }

  #getDetails(todoItem) {
    return {
      message: todoItem.message,
      id: todoItem.id,
      markedStatus: todoItem.markedStatus,
    };
  }

  getAllTodoItems() {
    const todoItems = this.#todoItems.map((todoItem) => this.#getDetails(todoItem));
    return {
      sortAlphabetical: this.#sortAlphabetical,
      sortDoneUndone: this.#sortDoneUndone,
      todoItems,
    };
  }

  toggleMarkedStatus(todoItemId) {
    const targetedTodo = this.#todoItems.find((todoItem) => todoItem.id === todoItemId);
    targetedTodo.toggleMarkedStatus();
  }

  removeTodoItem(id) {
    this.#todoItems = this.#todoItems.filter((todoItem) => todoItem.id !== id);
  }
}

class TodoList {
  #todoList;

  constructor() {
    this.#todoList = {};
  }

  add(todoId, todoTitle, alphabeticalSortStatus, doneUndoneSortStatus) {
    this.#todoList[todoId] = { id: todoId };
    this.#todoList[todoId].todo = new Todo(alphabeticalSortStatus, doneUndoneSortStatus);
    this.#todoList[todoId].title = todoTitle;
  }

  addTodoItem(todoId, message) {
    this.#todoList[todoId].todo.add(message);
  }

  toggleMarkedStatus(todoId, todoItemId) {
    this.#todoList[todoId].todo.toggleMarkedStatus(todoItemId);
  }

  removeTodoItem(todoId, id) {
    this.#todoList[todoId].todo.removeTodoItem(id);
  }

  toggleAlphabeticalSort(todoId) {
    this.#todoList[todoId].todo.toggleAlphabeticalSort();
  }

  toggleSortDoneUndone(todoId) {
    this.#todoList[todoId].todo.toggleSortDoneUndone();
  }

  getAllTodos() {
    return Object.values(this.#todoList).map(({ id, todo, title }) => {
      const { todoItems, sortAlphabetical, sortDoneUndone } = todo.getAllTodoItems();
      return { id, todoItems, sortAlphabetical, sortDoneUndone, title };
    });
  }
}
