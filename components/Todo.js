class Todo {
  constructor(data, selector, onToggle, onDelete) {
    this._data = data;
    this._selector = selector;
    this._onToggle = onToggle;
    this._onDelete = onDelete;
  }

  getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _setEventListeners() {
    this._label = this._element.querySelector(".todo__label");
    this._checkBox = this._element.querySelector(".todo__completed");
    this._element
      .querySelector(".todo__completed")
      .addEventListener("change", (evt) => {
        this._handleCheckBox();
        this._onToggle(evt.target.checked);
      });

    this._element
      .querySelector(".todo__delete-btn")
      .addEventListener("click", (evt) => {
        this._handleDeleteButton();
        this._onDelete(evt.target.closest(".todo"));
      });
  }

  generateTodo() {
    this._element = this.getTemplate();
    this._setEventListeners();
    this._generateUniqueId();
    this._element.querySelector(".todo__name").textContent = this._data.name;
    this._checkBox.id = `todo-${this._data.id}`;
    this._checkBox.checked = this._data.completed;
    this._label.setAttribute("for", `todo-${this._data.id}`);
    this._parseDate();
    return this._element;
  }

  _handleCheckBox() {
    this._data.completed = this._checkBox.checked;
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
