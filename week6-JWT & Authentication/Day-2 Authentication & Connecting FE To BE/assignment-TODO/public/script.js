let token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
});

async function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Signup failed");
        }
        alert("Signup successful");
    } catch (err) {
        alert("Signup error: " + err.message);
    }
}

async function signin() {
    const username = document.getElementById("signinUsername").value;
    const password = document.getElementById("signinPassword").value;

    try {
        const response = await fetch("/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Invalid credentials");
        }

        const data = await response.json();
        token = data.token;
        localStorage.setItem("token", token);
        await loadTodos();
    } catch (err) {
        alert("Signin error: " + err.message);
    }
}

function logout() {
    localStorage.removeItem("token");
    token = null;
    document.getElementById("todos").innerHTML = "";
    alert("Logged out");
}

async function authFetch(url, options = {}) {
    if (!token) throw new Error("Not authenticated");
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            token
        }
    });
}

async function addTodo() {
    const title = document.getElementById("todoInput").value;
    if (!title.trim()) return alert("Title cannot be empty");

    try {
        const response = await authFetch("/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        if (!response.ok) throw new Error("Failed to add todo");
        document.getElementById("todoInput").value = "";
        await loadTodos();
    } catch (err) {
        alert("Error adding todo: " + err.message);
    }
}

async function loadTodos() {
    if (!token) return;

    try {
        const response = await authFetch("/todos");
        if (!response.ok) throw new Error("Failed to load todos");

        const todos = await response.json();
        const todosDiv = document.getElementById("todos");
        if (!todosDiv) return;

        todosDiv.innerHTML = "";
        todos.forEach(todo => {
            const div = document.createElement("div");
            div.className = "todo";

            const span = document.createElement("span");
            span.textContent = todo.title;
            span.className = todo.completed ? "completed" : "";

            const doneBtn = document.createElement("button");
            doneBtn.textContent = "Done";
            doneBtn.onclick = () => completeTodo(todo.id);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteTodo(todo.id);

            const btnGroup = document.createElement("div");
            btnGroup.append(doneBtn, deleteBtn);
            div.append(span, btnGroup);
            todosDiv.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        const todosDiv = document.getElementById("todos");
        if (todosDiv) todosDiv.innerHTML = "Failed to load todos.";
    }
}

async function completeTodo(id) {
    try {
        const response = await authFetch(`/todo/${id}`, { method: "PATCH" });
        if (!response.ok) throw new Error("Failed to mark todo as done");
        await loadTodos();
    } catch (err) {
        alert("Error: " + err.message);
    }
}

async function deleteTodo(id) {
    try {
        const response = await authFetch(`/todo/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete todo");
        await loadTodos();
    } catch (err) {
        alert("Error: " + err.message);
    }
}
