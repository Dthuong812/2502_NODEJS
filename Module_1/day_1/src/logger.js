const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'log.txt');

function logAction(action, data) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${action}: ${JSON.stringify(data)}\n`;
    fs.appendFileSync(logPath, logEntry);
}

module.exports = { logAction };