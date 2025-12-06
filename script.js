// get elements
const timeDisplay = document.getElementById("time-display");
const statusLine = document.getElementById("status-line");
const lapsList = document.getElementById("laps-list");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const clearLapsBtn = document.getElementById("clear-laps-btn");
const card = document.querySelector(".stopwatch-card");

// time variables
let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

// format time helper (ms -> mm : ss . cs)
function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);
  const cs = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60);

  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  const cc = String(cs).padStart(2, "0");

  return `${mm} : ${ss} . ${cc}`;
}

// update display every frame
function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  timeDisplay.textContent = formatTime(diff);
}

// control functions
function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 10);
  statusLine.textContent = "Stopwatch is running...";
  card.classList.add("running");
}

function pauseStopwatch() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
  const now = Date.now();
  elapsed += now - startTime;
  statusLine.textContent = "Paused ⏸";
   card.classList.remove("running");
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  startTime = 0;
  elapsed = 0;
  lapCount = 0;
  timeDisplay.textContent = "00 : 00 . 00";
  lapsList.innerHTML = "";
  statusLine.textContent = "Reset done. Ready to track your time ⏱";
    card.classList.remove("running");
}

function addLap() {
  if (!isRunning) return;
  lapCount++;
  const now = Date.now();
  const currentTime = now - startTime + elapsed;

  const li = document.createElement("li");
  li.className = "lap-item";

  const labelSpan = document.createElement("span");
  labelSpan.className = "lap-label";
  labelSpan.textContent = `LAP ${lapCount}`;

  const timeSpan = document.createElement("span");
  timeSpan.className = "lap-time";
  timeSpan.textContent = formatTime(currentTime);

  li.appendChild(labelSpan);
  li.appendChild(timeSpan);
  lapsList.prepend(li); // latest lap on top
}

function clearLaps() {
  lapsList.innerHTML = "";
  lapCount = 0;
}

// attach events
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
clearLapsBtn.addEventListener("click", clearLaps);
