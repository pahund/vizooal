export default class Visualizer {
  #canvas = null;
  #dataProvider = null;

  constructor({ canvasId, dataProvider }) {
    this.#canvas = document.getElementById(canvasId);
    this.#dataProvider = dataProvider;
  }

  get ctx() {
    return this.#canvas.getContext("2d");
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }

  get amplitudes() {
    return this.#dataProvider.amplitudes;
  }

  get frequencies() {
    return this.#dataProvider.frequencies;
  }
}
