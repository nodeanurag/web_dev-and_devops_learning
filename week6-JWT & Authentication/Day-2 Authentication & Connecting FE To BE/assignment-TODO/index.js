const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "iloveKV";

app.use(express.json());
app.use(express.static("public"));

const users = [];
const todos = [];

function auth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.username = decoded.username;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(
        user => user.username === username
    );

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    users.push({
        username,
        password
    });

    res.json({
        message: "Signup successful"
    });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        {
            username
        },
        JWT_SECRET
    );

    res.json({
        token
    });
});

app.get("/todos", auth, (req, res) => {
    const userTodos = todos.filter(
        todo => todo.username === req.username
    );

    res.json(userTodos);
});

app.post("/todo", auth, (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    todos.push({
        id: Date.now(),
        title: title.trim(),
        completed: false,
        username: req.username
    });

    res.json({
        message: "Todo added"
    });
});

app.patch("/todo/:id", auth, (req, res) => {
    const todo = todos.find(
        todo =>
            todo.id == req.params.id &&
            todo.username === req.username
    );

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todo.completed = true;

    res.json({
        message: "Todo completed"
    });
});

app.delete("/todo/:id", auth, (req, res) => {
    const index = todos.findIndex(
        todo =>
            todo.id == req.params.id &&
            todo.username === req.username
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos.splice(index, 1);

    res.json({
        message: "Todo deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});