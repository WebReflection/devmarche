import Spinner from './spinner.js';

calculate.addEventListener('click', async event => {
  event.preventDefault();
  const value = parseInt(module.value, 10);

  if (!value || value < 0)
    throw new SyntaxError(`Invalid value: ${value}`);

  module.disabled = true;
  calculate.disabled = true;

  const spinner = new Spinner(result).start();
  const worker = new Worker('./worker.js', { type: 'module' });
  const view = new Int32Array(
    new SharedArrayBuffer(
      // wait for two entries: 1 to notify, one for result
      Int32Array.BYTES_PER_ELEMENT * 2
    )
  );
  worker.postMessage({ value, view });
  await Atomics.waitAsync(view, 0).value;
  spinner.stop();
  result.textContent = view[1];

  module.disabled = false;
  calculate.disabled = false;
});
