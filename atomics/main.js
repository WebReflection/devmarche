import Spinner from './spinner.js';
import loop from './loop.js';

calculate.addEventListener('click', event => {
  event.preventDefault();
  const value = parseInt(module.value, 10);

  if (!value || value < 0)
    throw new SyntaxError(`Invalid value: ${value}`);

  const spinner = new Spinner(result).start();
  const number = loop(value);
  spinner.stop();
  result.textContent = number;
});
