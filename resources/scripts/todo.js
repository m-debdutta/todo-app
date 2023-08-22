
const main = () => {
  const todoStorage = new Storage(localStorage);
  const todoList = new TodoList();
  const todoListView = new TodoView();
  const todoController = new MasterController(todoListView, todoList, todoStorage);
  todoController.start();
};

window.onload = main;