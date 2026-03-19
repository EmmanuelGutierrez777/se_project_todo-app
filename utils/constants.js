class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }

  getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  generateTodo() {
    this._element = this.getTemplate();
    this._setEventListeners();
    this._generateUniqueId();
    this._element.querySelector(".todo__name").textContent = this._data.name;
    this._element.querySelector(".todo__completed").checked =
      this._data.completed;
    this._element.querySelector(".todo__completed").id =
      `todo-${this._data.id}`;
    `todo-${this._data.id}`;
    this._element
      .querySelector(".todo__label")
      .setAttribute("for", `todo-${this._data.id}`);
    this._dateParse();
    return this._element;
  }

  _generateUniqueId() {
    if (!this._data.id) {
      this._data.id = `todo-${this._data.uniqueId}`;
      this._element
        .querySelector(".todo__label")
        .setAttribute("for", `todo-${this._data.uniqueId}`);
    }
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _dateParse() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._element.querySelector(".todo__date").textContent =
        `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
    }
  }
}

export { Todo };
