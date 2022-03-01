import Visualizer from "./Visualizer.js";

export default class Eraser extends Visualizer {
  constructor(options) {
    super(options);
  }

  draw() {
    const { ctx, width, height } = this.getDrawingVariables();
    ctx.clearRect(0, 0, width, height);
  }
}
