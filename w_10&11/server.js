const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Temporary data storage
let students = [];

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

// Login route
app.post('/login', (req, res) => {
    const user = { username: req.body.username };
    const token = jwt.sign(user, SECRET_KEY);

    res.json({ token });
});

// Create
app.post('/students', authenticateToken, (req, res) => {
    const student = req.body;
    students.push(student);
    res.json(student);
});

// Read
app.get('/students', authenticateToken, (req, res) => {
    res.json(students);
});

// Update
app.put('/students/:id', authenticateToken, (req, res) => {
    const id = req.params.id;

    if (!students[id]) return res.sendStatus(404);

    students[id] = req.body;
    res.json(students[id]);
});

// Delete
app.delete('/students/:id', authenticateToken, (req, res) => {
    const id = req.params.id;

    if (!students[id]) return res.sendStatus(404);

    students.splice(id, 1);
    res.send("Deleted");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});