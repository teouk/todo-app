let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        input.value = "";
    }
});

function addTask(text, completed = false) {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = text;
    taskSpan.style.flex = "1";

    if (completed) {
        taskSpan.classList.add("completed");
    }

    taskSpan.addEventListener("click", () => {
        taskSpan.classList.toggle("completed");
        updateStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        tasks = tasks.filter(t => t.text !== text);
        updateStorage();
    });

    li.style.display = "flex";
    li.style.alignItems = "center";
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    if (!tasks.find(t => t.text === text)) {
    tasks.push({ text, completed });
    updateStorage();
  }

  function updateStorage() {
  tasks = [...document.querySelectorAll("#todo-list li")].map(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");
    return { text, completed };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
}
tasks.forEach(task => addTask(task.text, task.completed));
