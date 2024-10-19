const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const logFilePath = path.join(__dirname, 'visits.log');

// Middleware to log visits
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to log visit:', err);
        }
    });
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the site!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
