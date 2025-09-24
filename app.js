// Haetaan elementit
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const template = document.getElementById("task-template");

// Vaihe 1: luodaan taulukko kaikille tehtäville
let tasks = [];

// Vaihe 2: tallennetaan se localStorageen
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Vaihe 3: näytetään tallennetut tehtävät ruudulla
function renderTasks() {
  taskList.innerHTML = ""; 
  tasks.forEach((task, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");

    const taskText = li.querySelector(".task-text");
    const checkbox = li.querySelector(".task-checkbox");
    const deleteBtn = li.querySelector(".delete-btn");

    // Aseta teksti ja tila
    taskText.textContent = task.text;
    if (task.done) {
      taskText.classList.add("line-through", "text-gray-500");
      checkbox.checked = true;
    }

    // Checkbox 
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // Poista-nappi 
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1); 
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Lomakkeen submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  // Lisää uusi tehtävä taulukkoon
  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();

  input.value = "";
});

// Kun sivu ladataan: hae tehtävät localStoragesta
const saved = localStorage.getItem("tasks");
if (saved) {
  tasks = JSON.parse(saved);
  renderTasks();
}
