import { show, wait } from './utils.js';

const target = 'Ancona';

// Template Literals
const noTag = `Ciao ${target} 👋`;
show(noTag);
wait();



// Template Literals' Tag
// syntax without invoke: tag`...`
// parentheses are passed aside as interpolations
// it can return anything, not just strings
let tag = (template, ...interpolations) => {
  console.log({ template, interpolations });
  return 42;
};

show(tag`Ciao ${target} 👋`);
wait();



// Features: Unique Template
// the template is always the same per scope definition
const ws = new WeakSet; // <-- why "weak" ? ... later ...
tag = (template, ...interpolations) => {
  if (!ws.has(template)) {
    ws.add(template);
    console.log('New template ⚠️', { template });
    return 42;
  }
  // ... just return the content as string for now ...
  for (var out = [template[0]], i = 1; i < template.length; i++)
    out.push(interpolations[i - 1], template[i]);
  return out.join('');
};

show(tag`Ciao ${target} 👋`);
wait();

show(tag`Ciao ${target} 👋`);
wait();



// Unique per *definition scope*
let repeated = target => tag`Ciao ${target} 👋`;
//                          ^^^^^^^^^^^^^^^^^^^

show(repeated(target));
wait();

show(repeated(target));

// ... that's why!
repeated = null;
