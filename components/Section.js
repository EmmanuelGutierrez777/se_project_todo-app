export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._initialArray = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      const todoItem = this._renderer(item);
      this.addItem(todoItem);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }
}
