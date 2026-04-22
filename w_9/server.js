const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// Create event emitter
const eventEmitter = new EventEmitter();

// Create custom event
eventEmitter.on('userVisited', () => {
    console.log("User visited the server!");
});

// Create server
const server = http.createServer((req, res) => {

    // Trigger event
    eventEmitter.emit('userVisited');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    // -------- OS MODULE --------
    const systemInfo = `
    <h3>OS Information</h3>
    Platform: ${os.platform()} <br>
    CPU Architecture: ${os.arch()} <br>
    Free Memory: ${os.freemem()} <br>
    Total Memory: ${os.totalmem()} <br>
    `;

    // -------- PATH MODULE --------
    const filePath = path.join(__dirname, 'server.js');

    const pathInfo = `
    <h3>Path Information</h3>
    File Path: ${filePath} <br>
    Directory Name: ${path.dirname(filePath)} <br>
    File Name: ${path.basename(filePath)} <br>
    Extension: ${path.extname(filePath)} <br>
    `;

    // -------- RESPONSE --------
    res.end(`
    <h2>Custom Node.js Server</h2>
    ${systemInfo}
    ${pathInfo}
    `);
});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});