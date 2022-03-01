import Oscilloscope from "./visualizers/Oscilloscope.js";
import FrequencyDisplay from "./visualizers/FrequencyDisplay.js";
import Eraser from "./visualizers/Eraser.js";
import DataProvider from "./DataProvider.js";
import improveBrowserCompatibility from "./improveBrowserCompatibility.js";
import prepareCanvas from "./prepareCanvas.js";

// Global Variables for Audio
let audioContext;
let sourceNode;
let analyzer;
let javascriptNode;
let audioData = null;
let audioPlaying = false;
let sampleSize = 1024; // number of samples to collect before analyzing data
// This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error
let audioUrl = "./media/predatory-mollusc-jingle.ogg";
// Global variables for the Graphics
let canvasId = "canvas";

improveBrowserCompatibility();
prepareCanvas(canvasId);

// When the Start button is clicked, finish setting up the audio nodes, play the sound,
// gather samples for the analysis, update the canvas
document.getElementById(canvasId).addEventListener("click", function (e) {
  e.preventDefault();
  if (!audioPlaying) {
    // Set up the audio Analyser, the Source Buffer and javascriptNode
    setupAudioNodes();
    const dataProvider = new DataProvider({ analyzer });
    const eraser = new Eraser({ canvasId, dataProvider });
    const frequencyDisplay = new FrequencyDisplay({
      canvasId,
      dataProvider,
    });
    const oscilloscope = new Oscilloscope({
      canvasId,
      dataProvider,
    });
    // setup the event handler that is triggered every time enough samples have been collected
    // trigger the audio analysis and draw the results
    javascriptNode.onaudioprocess = function () {
      // draw the display if the audio is playing
      if (audioPlaying) {
        requestAnimFrame(() => {
          dataProvider.update();
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
  } else {
    // if audio is currently playing
    audioContext.close();
    sourceNode.stop(0);
    audioPlaying = false;
  }
});

function setupAudioNodes() {
  try {
    audioContext = new AudioContext();
  } catch (e) {
    alert("Web Audio API is not supported in this browser");
  }
  sourceNode = audioContext.createBufferSource();
  analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 256;
  javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
  // Now connect the nodes together
  sourceNode.connect(audioContext.destination);
  sourceNode.connect(analyzer);
  analyzer.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
}

// Load the audio from the URL via Ajax and store it in global variable audioData
// Note that the audio load is asynchronous
function loadSound(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  // When loaded, decode the data and play the sound
  request.onload = function () {
    audioContext.decodeAudioData(
      request.response,
      function (buffer) {
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
