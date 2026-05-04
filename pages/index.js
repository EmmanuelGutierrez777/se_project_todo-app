import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

const validation = new FormValidator(validationConfig, addTodoForm);
validation.enableValidation();

addTodoButton.addEventListener("click", () => {
  todoPopupForm.open();
});

const todoPopupForm = new PopupWithForm(
  {
    popupSelector: "#add-todo-popup",
  },
  dataTransformation,
);

todoPopupForm.setEventListeners();

initialTodos.forEach((item) => {
  renderTodo(item);
});

function dataTransformation(valuesObj) {
  const name = valuesObj.name;
  const dateInput = valuesObj.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const uniqueId = crypto.randomUUID();
  const values = { name, date, uniqueId };
  renderTodo(values);
  todoCounter.updateTotal(true);
  todoCounter._updateText();
}

function renderTodo(todoData) {
  const todoInstance = new Todo(todoData, "#todo-template");
  const todoElement = todoInstance.generateTodo();
  todosList.append(todoElement);
}

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todos = document.querySelectorAll(".todo");

function checkboxListener(data) {
  data.forEach((item) => {
    const checkbox = item.querySelector(".todo__completed");
    checkbox.addEventListener("click", () => {
      todoCounter.updateCompleted(item.checked);
    });
  });
}

export { todos, checkboxListener, todoCounter };
