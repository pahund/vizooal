import Visualizer from "./Visualizer.js";

export default class FrequencyDisplay extends Visualizer {
  dataArray = null;

  constructor(options) {
    super(options);
    this.dataArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
  }

  draw() {
    const { ctx, width, height } = this.getDrawingVariables();
    this.analyzerNode.getByteFrequencyData(this.dataArray);
    const bufferLength = this.analyzerNode.frequencyBinCount;

    const barWidth = width / bufferLength;
    let barHeight = 0;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const val = this.dataArray[i];
      barHeight = (val / 256) * height;

      ctx.fillStyle = `rgb(${val},${val},${val})`;
      // ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
      ctx.fillRect(x, height - barHeight, barWidth, height);

      x += barWidth;
    }
  }
}
