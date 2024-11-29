import exports from 'https://esm.run/accordant/worker';

const random = Math.random();

exports({
  random: () => ({ Worker: random }),
});
