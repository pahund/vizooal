export default class Resizer {
    #canvas = null;

    constructor({ canvasId }) {
        this.#canvas = document.getElementById(canvasId);
    }

    #resize = () => {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    }

    start() {
        this.#resize();
        window.onresize = this.#resize();
    }

    stop() {
        window.onresize = () => {}
    }
}