export default function improveBrowserCompatibility() {
  // Hacks to deal with different function names in different browsers
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  window.AudioContext = (function () {
    return (
      window.webkitAudioContext || window.AudioContext || window.mozAudioContext
    );
  })();
}
