const { spawn } = require('node:child_process');
const { createWriteStream } = require('node:fs');
const path = require('node:path');

const logPath = path.join(process.cwd(), 'build.log');
const logStream = createWriteStream(logPath);

const child = spawn('npm', ['run', 'build'], {
  shell: process.platform === 'win32',
  stdio: ['inherit', 'pipe', 'pipe'],
});

function relay(stream, destination) {
  stream.on('data', (chunk) => {
    destination.write(chunk);
    logStream.write(chunk);
  });
}

relay(child.stdout, process.stdout);
relay(child.stderr, process.stderr);

child.on('close', (code) => {
  logStream.end(() => {
    process.exit(code ?? 0);
  });
});
