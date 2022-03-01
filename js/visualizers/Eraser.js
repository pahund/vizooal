import Visualizer from "./Visualizer.js";

export default class Eraser extends Visualizer {
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
