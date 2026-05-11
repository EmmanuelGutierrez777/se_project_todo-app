import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, render) {
    super({ popupSelector });
    this._handleSubmit = render;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handleSubmit(this._inputValues);
      this._popupForm.reset();
      this.close();
    });
  }
}
