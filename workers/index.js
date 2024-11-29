import { SharedWorker, Worker, proxied } from 'https://esm.run/accordant/main';
import html from '../html/html.js';

const sw = new SharedWorker('./shared-worker.js');
const w = new Worker('./worker.js');

const [rsw, rw] = await Promise.all([
  sw.random(),
  w.random(),
]);

console.log(rsw);
console.log(rw);

main.append(html`
  <h3>${document.title}</h3>
  <ul>
    <li>${[...Object.entries(rsw)][0].join(' ')}</li>
    <li>${[...Object.entries(rw)][0].join(' ')}</li>
  </ul>
`);

console.log(proxied(sw));
console.log(proxied(w));
