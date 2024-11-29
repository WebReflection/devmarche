import coincident from 'https://esm.run/coincident/server/worker';

const { server, window } = await coincident();

const { default: html } = await window.import('/html.js');
const { default: os } = await server.import('os');

const [
  platform,
  arch,
  cpus,
  totalmem,
] = [
  os.platform(),
  os.arch(),
  os.cpus().length,
  os.totalmem(),
];

const update = event => {
  event.target.textContent = `Free: ${os.freemem()}`;
};

const { document } = window;

document.body.append(
  html`
    <h1>🦄 coincident</h1>
    <ul>
      <li>Platform: ${platform}</li>
      <li>Arch: ${arch}</li>
      <li>CPUS: ${cpus}</li>
      <li>RAM: ${totalmem}</li>
      <li id="free" onclick=${update}></li>
    </ul>
  `
);

document.getElementById('free').click();
