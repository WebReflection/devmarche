import exports from 'https://esm.run/accordant/shared-worker';

const random = Math.random();

exports({
  random: () => ({ SharedWorker: random }),
});
