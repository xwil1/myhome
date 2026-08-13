const storageKeys = {
  note: "my-home:scratchpad",
  tasks: "my-home:tasks",
};

const greeting = document.querySelector("#greeting");
const dateDisplay = document.querySelector("#date-display");
const todayLabel = document.querySelector("#today-label");
const taskInputs = [...document.querySelectorAll("[data-task]")];
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const scratchpad = document.querySelector("#scratchpad");
const saveStatus = document.querySelector("#save-status");
const clearNote = document.querySelector("#clear-note");

function inBeijingTime() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }),
  );
}

function setDateAndGreeting() {
  const now = inBeijingTime();
  const hour = now.getHours();
  const hourGreeting =
    hour < 12 ? "Good morning." : hour < 18 ? "Good afternoon." : "Good evening.";

  greeting.textContent = `${hourGreeting} Welcome home.`;
  dateDisplay.textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);
  todayLabel.textContent = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Shanghai",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(now)
    .toUpperCase() + " · BEIJING TIME";
}

function readTasks() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.tasks)) ?? {};
  } catch {
    return {};
  }
}

function updateTaskProgress() {
  const finished = taskInputs.filter((input) => input.checked).length;
  progressLabel.textContent = `${finished} / ${taskInputs.length}`;
  progressBar.style.width = `${(finished / taskInputs.length) * 100}%`;
}

function restoreTasks() {
  const savedTasks = readTasks();
  taskInputs.forEach((input) => {
    input.checked = Boolean(savedTasks[input.dataset.task]);
    input.addEventListener("change", () => {
      const nextTasks = readTasks();
      nextTasks[input.dataset.task] = input.checked;
      localStorage.setItem(storageKeys.tasks, JSON.stringify(nextTasks));
      updateTaskProgress();
    });
  });
  updateTaskProgress();
}

function restoreScratchpad() {
  scratchpad.value = localStorage.getItem(storageKeys.note) ?? "";

  scratchpad.addEventListener("input", () => {
    localStorage.setItem(storageKeys.note, scratchpad.value);
    saveStatus.textContent = "Saved on this device";
  });

  clearNote.addEventListener("click", () => {
    scratchpad.value = "";
    localStorage.removeItem(storageKeys.note);
    saveStatus.textContent = "Note cleared";
    scratchpad.focus();
  });
}

setDateAndGreeting();
restoreTasks();
restoreScratchpad();
