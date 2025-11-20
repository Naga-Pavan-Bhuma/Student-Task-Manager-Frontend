const API = "http://localhost:3000";

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();
  renderTasks(tasks);
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTasks();
}

async function completeTask(id) {
  await fetch(`${API}/tasks/${id}/complete`, {
    method: 'PATCH'
  });

  loadTasks();
}

// UI render logic
function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let pending = 0, completed = 0;

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
      completed++;
    } else {
      pending++;
      const btn = document.createElement("button");
      btn.textContent = "Complete";
      btn.onclick = () => completeTask(task.id);
      li.appendChild(btn);
    }

    list.appendChild(li);
  });

  document.getElementById("pendingCount").textContent = pending;
  document.getElementById("completedCount").textContent = completed;
}

function markCompleted(){
  alert("Your Task has been completed")
}

document.getElementById("addBtn").addEventListener("click", addTask);

loadTasks();
