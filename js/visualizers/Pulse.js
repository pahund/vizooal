import Visualizer from "./Visualizer.js";

const pulseDuration = 20;
const pulseIncrement = 10;

export default class Pulse extends Visualizer {
  #frequency = 0;
  #prevValue = 0;
  #threshold = 0;
  #pulses = [];

  constructor(options) {
    super(options);
    ({ frequency: this.#frequency, threshold: this.#threshold } = options);
  }

  draw() {
    const currValue = this.frequencies[this.#frequency];
    if (currValue > this.#threshold && currValue < this.#prevValue) {
      this.#pulses.push({ cycle: 0 });
      this.#prevValue = 0;
    } else {
      this.#prevValue = currValue;
    }
    this.#pulses = this.#pulses.reduce((acc, curr) => {
      const { cycle } = curr;
      const nextCycle = cycle + 1;
      if (nextCycle > pulseDuration) {
        return [...acc];
      }
      this.ctx.beginPath();
      this.ctx.arc(
        this.width / 2,
        this.height / 2,
        nextCycle * pulseIncrement,
        0,
        2 * Math.PI,
        true
      );
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.stroke();
      return [...acc, { cycle: nextCycle }];
    }, []);
  }
}
