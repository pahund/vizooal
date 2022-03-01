import Oscilloscope from "./visualizers/Oscilloscope.js";
import FrequencyDisplay from "./visualizers/FrequencyDisplay.js";
import Eraser from "./visualizers/Eraser.js";

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
// Global Variables for Audio
let audioContext;
let sourceNode;
let analyzerNode;
let javascriptNode;
let audioData = null;
let audioPlaying = false;
let sampleSize = 1024; // number of samples to collect before analyzing data
// This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error
let audioUrl = "./media/predatory-mollusc-jingle.ogg";
// Global variables for the Graphics
let canvasId = "canvas";
let ctx;

ctx = document.querySelector("#canvas").getContext("2d");

// When the Start button is clicked, finish setting up the audio nodes, play the sound,
// gather samples for the analysis, update the canvas
document.querySelector("#start_button").addEventListener("click", function (e) {
  // the AudioContext is the primary 'container' for all your audio node objects
  if (!audioContext) {
    try {
      audioContext = new AudioContext();
    } catch (e) {
      alert("Web Audio API is not supported in this browser");
    }
  }

  e.preventDefault();
  // Set up the audio Analyser, the Source Buffer and javascriptNode
  setupAudioNodes();
  const eraser = new Eraser({ canvasId });
  const frequencyDisplay = new FrequencyDisplay({
    canvasId,
    analyzerNode,
  });
  const oscilloscope = new Oscilloscope({
    canvasId,
    analyzerNode,
  });
  // setup the event handler that is triggered every time enough samples have been collected
  // trigger the audio analysis and draw the results
  javascriptNode.onaudioprocess = function () {
    // draw the display if the audio is playing
    if (audioPlaying) {
      requestAnimFrame(() => {
        eraser.draw();
        frequencyDisplay.draw();
        oscilloscope.draw();
      });
    }
  };
  // Load the Audio the first time through, otherwise play it from the buffer
  if (audioData == null) {
    loadSound(audioUrl);
  } else {
    playSound(audioData);
  }
});

// Stop the audio playing
document.querySelector("#stop_button").addEventListener("click", function (e) {
  e.preventDefault();
  sourceNode.stop(0);
  audioPlaying = false;
});

function setupAudioNodes() {
  sourceNode = audioContext.createBufferSource();
  analyzerNode = audioContext.createAnalyser();
  analyzerNode.fftSize = 256;
  javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
  // Now connect the nodes together
  sourceNode.connect(audioContext.destination);
  sourceNode.connect(analyzerNode);
  analyzerNode.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
}

// Load the audio from the URL via Ajax and store it in global variable audioData
// Note that the audio load is asynchronous
function loadSound(url) {
  document.getElementById("msg").textContent = "Loading audio...";
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  // When loaded, decode the data and play the sound
  request.onload = function () {
    audioContext.decodeAudioData(
      request.response,
      function (buffer) {
        document.getElementById("msg").textContent =
          "Audio sample download finished";
        audioData = buffer;
        playSound(audioData);
      },
      onError
    );
  };
  request.send();
}

// Play the audio and loop until stopped
function playSound(buffer) {
  sourceNode.buffer = buffer;
  sourceNode.start(0); // Play the sound now
  sourceNode.loop = true;
  audioPlaying = true;
}

function onError(e) {
  console.log(e);
}
