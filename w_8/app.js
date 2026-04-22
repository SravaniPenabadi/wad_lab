const express = require('express'); 
const session = require('express-session'); 
const cookieParser = require('cookie-parser'); 
const app = express(); 
// Middleware 
app.use(cookieParser()); 
app.use(session({ 
secret: 'secretKey', 
resave: false, 
saveUninitialized: true})); 
// Home route 
app.get('/', (req, res) => { 
// -------- COOKIE -------- 
let visits = req.cookies.visits; 
if (visits) { 
visits = parseInt(visits) + 1; 
} else { 
visits = 1;  } 
res.cookie('visits', visits, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day 
// -------- SESSION -------- 
if (req.session.views) { 
req.session.views++; 
} else { 
req.session.views = 1;    } 
res.send(`  <h2>Session Tracking Demo</h2> 
<p><b>Cookie Visits:</b> ${visits}</p> 
<p><b>Session Visits:</b> ${req.session.views}</p> 
<a href="/logout">Logout (Destroy Session)</a>`);}); 
// Destroy session 
app.get('/logout', (req, res) => { 
req.session.destroy(() => { 
res.send(` 
<h3>Session Destroyed</h3> 
<a href="/">Go Home</a>`);});}); 
// Start server 
app.listen(3000, () => { 
console.log("Server running at h p://localhost:3000");});