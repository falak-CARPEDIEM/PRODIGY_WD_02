// Get elements
const timeDisplay = document.getElementById("time-display");
const statusLine = document.getElementById("status-line");
const lapsList = document.getElementById("laps-list");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const clearLapsBtn = document.getElementById("clear-laps-btn");

// Time variables (milliseconds based)
let startTime = 0;      // when current run started
let elapsed = 0;        // total elapsed ms (including previous runs)
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

// Convert ms -> "MM : SS . CC"
function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);   // 1 cs = 10 ms
  const cs = totalCentiseconds % 100;              // 0–99
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60);

  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  const cc = String(cs).padStart(2, "0");

  return `${mm} : ${ss} . ${cc}`;
}

// Update display every tick
function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  timeDisplay.textContent = formatTime(diff);
}

// Start
function startStopwatch() {
  if (isRunning) return;

  isRunning = true;
  startTime = Date.now();               // start fresh from now
  timerInterval = setInterval(updateTime, 10); // update every 10ms (centiseconds)
  statusLine.textContent = "Stopwatch is running...";
}

// Pause
function pauseStopwatch() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;

  const now = Date.now();
  elapsed += now - startTime;           // add current run to total
  statusLine.textContent = "Paused ⏸";
}

// Reset
function resetStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;

  startTime = 0;
  elapsed = 0;
  lapCount = 0;

  timeDisplay.textContent = "00 : 00 . 00";
  lapsList.innerHTML = "";
  statusLine.textContent = "Reset done. Ready to track your time ⏱";
}

// Add lap
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

  // Latest lap on top
  lapsList.prepend(li);
}

// Clear laps
function clearLaps() {
  lapsList.innerHTML = "";
  lapCount = 0;
}

// Event listeners
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
clearLapsBtn.addEventListener("click", clearLaps);
