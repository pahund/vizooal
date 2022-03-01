import Visualizer from "./Visualizer.js";

export default class FrequencyDisplay extends Visualizer {
  draw() {
    const len = this.frequencies.length;
    const barWidth = this.width / len;
    let barHeight = 0;
    let x = 0;
    for (let i = 0; i < len; i++) {
      const val = this.frequencies[i];
      barHeight = (val / 256) * this.height;
      this.ctx.fillStyle = `rgb(${val},${val},${val})`;
      this.ctx.fillRect(x, this.height - barHeight, barWidth, this.height);
      x += barWidth;
    }
  }
}
