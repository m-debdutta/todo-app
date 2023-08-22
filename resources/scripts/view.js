class TodoView {
  #handlerList;

  constructor() {
    this.#handlerList = {};
  }

  #clearListContainer() {
    const todoElements = document.querySelectorAll('#todo-list-container > .todo');
    todoElements.forEach((todoElement) => todoElement.remove());
  }

  #createTodoMessageElement(todoId, todoItem) {
    const todoMessage = document.createElement('span');
    todoMessage.innerText = todoItem.message;

    todoMessage.onclick = () => {
      this.#handlerList.toggleMark(todoId, todoItem.id);
    };

    if (todoItem.markedStatus) {
      todoMessage.className = 'strike-through';
    }

    return todoMessage;
  }

  #createDeleteButton(todoId, todoItem) {
    const deleteButton = document.createElement('input');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.value = 'X';

    deleteButton.onclick = () => {
      this.#handlerList.delete(todoId, todoItem.id);
    };

    return deleteButton;
  }

  #createTodoItemElement(todoId, todoItem) {
    const todoElement = document.createElement('li');
    todoElement.className = 'todo-item';
    todoElement.id = `todo-item-${todoId}-${todoItem.id}`;
    const todoMessage = this.#createTodoMessageElement(todoId, todoItem);
    const deleteButton = this.#createDeleteButton(todoId, todoItem);
    todoElement.appendChild(todoMessage);
    todoElement.appendChild(deleteButton);

    return todoElement;
  }

  #setUpAddButtonEvent(todoId, addButton, textBox) {
    addButton.onclick = () => {
      const message = textBox.value;
      if (message === '') return;
      textBox.value = '';
      this.#handlerList.addTodoItem(todoId, message);
    };
  }

  #setUpSortAlphabeticalButton(todoId, alphabeticalSortButton) {
    alphabeticalSortButton.onclick = () => {
      this.#handlerList.toggleAlphabeticalSort(todoId);
    };
  }

  #setUpSortDoneUndone(todoId, sortDoneUndoneButton) {
    sortDoneUndoneButton.onclick = () => {
      this.#handlerList.toggleDoneUndoneSort(todoId);
    };
  }

  #setUpCreateTodoButton() {
    const createTodoButton = document.querySelector('#create-todo-button');
    createTodoButton.onclick = () => {
      const createTodoBox = document.querySelector('#title-input-box');
      const todoName = createTodoBox.value;
      if (todoName === '') return;
      createTodoBox.value = '';
      this.#handlerList.createTodo(todoName);
    };
  }

  #createSortButtons(todoId) {
    const sortDoneUndone = document.createElement('input');
    sortDoneUndone.type = 'button';
    sortDoneUndone.value = 'sort done-undone';
    sortDoneUndone.className = 'sort-done-undone';
    sortDoneUndone.id = todoId + '_done-undone-button';
    this.#setUpSortDoneUndone(todoId, sortDoneUndone);

    const sortAlphabetical = document.createElement('input');
    sortAlphabetical.type = 'button';
    sortAlphabetical.value = 'sort A-z';
    sortDoneUndone.className = 'sort-button';
    sortDoneUndone.id = todoId + '_sort-button';
    this.#setUpSortAlphabeticalButton(todoId, sortAlphabetical);

    return { sortAlphabetical, sortDoneUndone };
  }

  #createHeadingSection(todoTitle, todoId) {
    const { sortAlphabetical, sortDoneUndone } = this.#createSortButtons(todoId);

    const heading = document.createElement('div');
    heading.className = 'heading';

    const header = document.createElement('header');
    header.className = 'header';

    const mainHeading = document.createElement('div');
    mainHeading.className = 'main-heading';

    const h1 = document.createElement('h1');
    h1.innerText = todoTitle;

    const underLine = document.createElement('hr');

    const options = document.createElement('div');
    options.className = 'options';

    options.append(sortAlphabetical, sortDoneUndone);
    mainHeading.appendChild(h1);
    header.append(mainHeading, options);
    heading.append(header, underLine);
    return heading;
  }

  #createDisplayBlock(todoId) {
    const displayBlock = document.createElement('div');
    displayBlock.className = 'display-block';

    const todoList = document.createElement('ul');
    todoList.className = 'todo-list';
    todoList.id = `todo-list-${todoId}`;

    displayBlock.appendChild(todoList);
    return displayBlock;
  }

  #createInputBlock(todoId) {
    const inputBlock = document.createElement('div');
    inputBlock.className = 'input-block';

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Enter a todo...';
    inputBox.className = 'input-bar';

    const addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.value = '+ Add';
    addButton.className = 'add-button';
    this.#setUpAddButtonEvent(todoId, addButton, inputBox);

    inputBlock.append(inputBox, addButton);

    return inputBlock;
  }

  #createTodo(todoId, todoTitle) {
    const todo = document.createElement('section');
    todo.className = 'todo';
    todo.id = `todo-${todoId}`;

    const heading = this.#createHeadingSection(todoTitle, todoId);
    const displayBlock = this.#createDisplayBlock(todoId);
    const inputBlock = this.#createInputBlock(todoId);

    todo.append(heading, displayBlock, inputBlock);

    const todoContainer = document.querySelector('#todo-list-container');

    todoContainer.appendChild(todo);
  }

  #sortAlphabeticalOrder(todoDetails) {
    return todoDetails.sort((todo1, todo2) => (todo1.message < todo2.message ? -1 : 1));
  }

  #sortDoneUndoneOrder(todoDetails) {
    const marked = todoDetails.filter((todoItem) => todoItem.markedStatus);
    const unmarked = todoDetails.filter((todoItem) => !todoItem.markedStatus);
    return [...unmarked, ...marked];
  }

  #renderTodo(todoId, todoItems, sortAlphabetical, sortDoneUndone) {
    const targetTodo = document.querySelector('#todo-list-' + todoId);
    let sortedTodoItems = [...todoItems];

    if (sortAlphabetical) {
      sortedTodoItems = this.#sortAlphabeticalOrder([...todoItems]);
    }

    if (sortDoneUndone) {
      sortedTodoItems = this.#sortDoneUndoneOrder([...todoItems]);
    }

    const todoItemElements = sortedTodoItems.map((todoItem) =>
      this.#createTodoItemElement(todoId, todoItem)
    );

    targetTodo.append(...todoItemElements);
  }

  render(todoList) {
    this.#clearListContainer();
    todoList.forEach(({ id, todoItems, title, sortAlphabetical, sortDoneUndone }) => {
      this.#createTodo(id, title);
      this.#renderTodo(id, todoItems, sortAlphabetical, sortDoneUndone);
    });
  }

  on(eventName, handler) {
    this.#handlerList[eventName] = handler;
  }

  start() {
    this.#setUpCreateTodoButton();
  }
}
