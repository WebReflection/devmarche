import loop from './loop.js';

addEventListener('message', ({ data: { value, view } }) => {
  // save result into index 1
  view[1] = loop(value);
  // notify index 0 as ready
  view[0] = 1;
  Atomics.notify(view, 0);
});
