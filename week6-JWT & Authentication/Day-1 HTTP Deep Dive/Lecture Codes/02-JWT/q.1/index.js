const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "iloveKV";

const users = [];
const notes = [];

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.json({
        message: "Signup successful"
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].username === username &&
            users[i].password === password
        ) {
            foundUser = users[i];
        }
    }

    if (foundUser) {
        const token = jwt.sign(
            {
                username
            },
            JWT_SECRET
        );

        res.json({
            token,
            message: "Signin successful"
        });
    } else {
        res.status(403).json({
            message: "Invalid credentials"
        });
    }
});

function auth(req, res, next) {
    const token = req.headers.token;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.username = decoded.username;

        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
}

app.post("/notes", auth, (req, res) => {
    const content = req.body.content;

    notes.push({
        username: req.username,
        content
    });

    res.json({
        message: "Note added"
    });
});

app.get("/notes", auth, (req, res) => {
    const userNotes = [];

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].username === req.username) {
            userNotes.push(notes[i]);
        }
    }

    res.json({
        notes: userNotes
    });
});

app.delete("/notes", auth, (req, res) => {
    const content = req.body.content;

    for (let i = 0; i < notes.length; i++) {
        if (
            notes[i].username === req.username &&
            notes[i].content === content
        ) {
            notes.splice(i, 1);
            break;
        }
    }

    res.json({
        message: "Note deleted"
    });
});

app.listen(3000);