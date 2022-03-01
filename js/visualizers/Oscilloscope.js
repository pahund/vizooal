import Visualizer from "./Visualizer.js";

export default class Oscilloscope extends Visualizer {
  draw() {
    const len = this.amplitudes.length;
    this.ctx.beginPath();
    for (let i = 0; i < len; i++) {
      let x = i * (this.width / len);
      let y = this.amplitudes[i] * (this.height / 256);
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();
  }
}
