import Visualizer from "./Visualizer.js";
import logOnce from "../utils/logOnce.js";
import logMax from "../utils/logMax.js";

export default class Oscilloscope extends Visualizer {
  amplitudeArray = null;

  constructor(options) {
    super(options);
    this.amplitudeArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
  }

  draw() {
    const { ctx, width, height } = this.getDrawingVariables();
    this.analyzerNode.getByteTimeDomainData(this.amplitudeArray);
    const len = this.amplitudeArray.length;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      let x = i * (width / len);
      let y = this.amplitudeArray[i] * (height / 256);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      //ctx.fillStyle = "#ffffff";
      //ctx.fillRect(x, y, 1, 1);
    }
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }
}
