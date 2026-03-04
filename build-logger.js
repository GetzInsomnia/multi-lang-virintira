const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a write stream for the log file
const logFilePath = path.join(__dirname, 'build-log.txt');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Get current timestamp for the log
const timestamp = new Date().toISOString();
const startMessage = `\n\n--- Starting build at ${timestamp} ---\n`;

process.stdout.write(startMessage);
logStream.write(startMessage);

// Determine the correct npm command based on the OS
const npmCmd = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

// Spawn the build process
const buildProcess = spawn(npmCmd, ['run', 'build'], { shell: true });

// Capture standard output
buildProcess.stdout.on('data', (data) => {
    process.stdout.write(data); // Print to terminal
    logStream.write(data);      // Write to file
});

// Capture standard error
buildProcess.stderr.on('data', (data) => {
    process.stderr.write(data); // Print to terminal
    logStream.write(data);      // Write to file
});

// Handle process completion
buildProcess.on('close', (code) => {
    const endMessage = `\n--- Build process exited with code ${code} ---\n`;
    process.stdout.write(endMessage);
    logStream.write(endMessage);
    logStream.end();
});

buildProcess.on('error', (err) => {
    const errorMessage = `\nFailed to start subprocess: ${err.message}\n`;
    process.stderr.write(errorMessage);
    logStream.write(errorMessage);
    logStream.end();
});
