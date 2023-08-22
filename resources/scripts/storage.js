class Storage {
  #localStorage;

  constructor(localStorage) {
    this.#localStorage = localStorage;
  }

  store(todos) {
    this.#localStorage.setItem('todo-data', JSON.stringify(todos));
  }

  getTodos() {
    return JSON.parse(this.#localStorage.getItem('todo-data'));
  }
}