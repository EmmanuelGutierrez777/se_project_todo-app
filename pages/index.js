import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialTodos } from "../utils/constants.js";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "button_disabled",
};

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const validation = new FormValidator(validationConfig, addTodoForm);
validation.enableValidation();

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  validation.resetValidation();

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const uniqueId = crypto.randomUUID();
  const values = { name, date, uniqueId };
  renderTodo(values);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

function renderTodo(todoData) {
  const todoInstance = new Todo(todoData, "#todo-template");
  const todoElement = todoInstance.generateTodo();
  todosList.append(todoElement);
}

export { initialTodos, validationConfig };
