export default class Visualizer {
  canvas = null;
  analyzerNode = null;

  constructor({ canvasId, analyzerNode }) {
    this.canvas = document.getElementById(canvasId);
    this.analyzerNode = analyzerNode;
  }

  getDrawingVariables() {
    const ctx = this.canvas.getContext("2d");
    const { width, height } = this.canvas.getBoundingClientRect();
    return { ctx, width, height };
  }
}
