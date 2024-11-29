#!/usr/bin/env bun

import { basename, resolve } from 'path';

const { PORT = 3000 } = process.env;

const map = new Map;

const fr = new FinalizationRegistry(
  path => {
    // cleared
    console.log(`🚫 ${basename(path)}`);
    map.delete(path);
  }
);

Bun.serve({
  fetch(req) {
    const { pathname } = new URL(req.url);
    const fixed = pathname === '/' ? '/index.html' : pathname;
    const path = resolve(import.meta.dirname, `.${fixed}`);
    let file = map.get(path)?.deref();
    if (file)
      // cached
      console.log(`✅ ${basename(path)}`);
    else {
      // processed
      console.log(`⚙️ ${basename(path)}`);
      file = Bun.file(path);
      fr.register(file, path);
      map.set(path, new WeakRef(file));
    }
    return new Response(file);
  },
  error() {
    return new Response('404');
  }
});

console.log(`\x1b[1mhttp://localhost:${PORT}/\x1b[0m`);
