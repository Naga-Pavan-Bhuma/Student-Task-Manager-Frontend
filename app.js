const API = "http://localhost:3000";

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();
  renderTasks(tasks);
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = "";
}

async function completeTask(id) {
  await fetch(`${API}/tasks/${id}/complete`, {
    method: "PATCH"
  });

  loadTasks();
}

function renderTasks(tasks) {
  const activeList = document.getElementById("activeList");
  const completedList = document.getElementById("completedList");

  if (!activeList || !completedList) return;

  activeList.innerHTML = "";
  completedList.innerHTML = "";

  let pending = 0, completed = 0;

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
      completed++;
      completedList.appendChild(li);
    } else {
      pending++;

      const btn = document.createElement("button");
      btn.textContent = "Complete";
      btn.onclick = () => completeTask(task.id);

      li.appendChild(btn);
      activeList.appendChild(li);
    }
  });

  document.getElementById("pendingCount").textContent = pending;
  document.getElementById("completedCount").textContent = completed;
}

function markCompleted(){
  alert("Your Task has been completed")
}


const addBtn = document.getElementById("addBtn");
if (addBtn) addBtn.addEventListener("click", addTask);


if (document.getElementById("activeList")) {
  loadTasks();
}
