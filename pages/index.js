import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
section.renderItems();

const validation = new FormValidator(validationConfig, addTodoForm);
validation.enableValidation();

addTodoButton.addEventListener("click", () => {
  todoPopupForm.open();
});

const todoPopupForm = new PopupWithForm(
  {
    popupSelector: "#add-todo-popup",
  },
  transformData,
);

todoPopupForm.setEventListeners();

function transformData(valuesObj) {
  const name = valuesObj.name;
  const dateInput = valuesObj.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const uniqueId = uuidv4();
  const values = { name, date, uniqueId };
  renderTodo(values);
  todoCounter.updateTotal(true);
  validation.resetValidation();
}

function renderTodo(todoData) {
  const handleToggle = (isChecked) => {
    todoCounter.updateCompleted(isChecked);
  };
  const handleDelete = (todoElement) => {
    const wasCompleted = todoElement.querySelector(".todo__completed").checked;
    if (wasCompleted) {
      todoCounter.updateCompleted(false);
    }
    todoCounter.updateTotal(false);
  };
  const todoInstance = new Todo(
    todoData,
    "#todo-template",
    handleToggle,
    handleDelete,
  );
  const todoElement = todoInstance.generateTodo();
  section.addItem(todoElement);
}

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

export { todoCounter };
