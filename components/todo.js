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
    const label = this._element.querySelector(".todo__label");
    this._label = label;
    this._generateUniqueId();
    this._element.querySelector(".todo__name").textContent = this._data.name;
    const checkbox = this._element.querySelector(".todo__completed");
    checkbox.checked = this._data.completed;
    checkbox.id = `todo-${this._data.id}`;
    label.setAttribute("for", `todo-${this._data.id}`);
    this._parseDate();
    return this._element;
  }

  _generateUniqueId() {
    if (!this._data.id) {
      this._data.id = `todo-${this._data.uniqueId}`;
      this._label.setAttribute("for", `todo-${this._data.uniqueId}`);
    }
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _parseDate() {
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
