#!/usr/bin/env node

import { createReadStream } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import staticHandler from 'static-handler';

import coincident from 'coincident/server';

const { PORT = 3001 } = process.env;
const { dirname } = import.meta;

const handler = staticHandler(
  dirname,
  {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Resource-Policy': 'same-origin'
  }
);

const server = createServer((req, res) => {
  if (req.url === '/html.js') {
    const file = join(dirname, '..', '..', 'html', 'html.js');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    createReadStream(file).pipe(res);
    return;
  }
  if (handler(req, res)) return;
  res.writeHead(404);
  res.end();
});

coincident({ wss: new WebSocketServer({ server }) });

server.listen(+PORT, () => {
  console.log(`\x1b[1mhttp://localhost:${PORT}/\x1b[0m`);
});
