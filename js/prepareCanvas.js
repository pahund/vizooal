export default function prepareCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const scale = 4;
    canvas.width = canvas.width * scale;
    canvas.height = canvas.height * scale;
}
