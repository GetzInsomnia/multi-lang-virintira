const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer((req, res) => {
            handle(req, res);
        }).listen(port, '0.0.0.0', (err) => {
            if (err) {
                console.error('Server start error:', err);
                process.exit(1);
            }
            console.log(`> Ready on http://0.0.0.0:${port}`);
        });
    })
    .catch(err => {
        console.error('Next prepare failed:', err);
        process.exit(1);
    });