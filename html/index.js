import html from './html.js';

let selected = -1;

document.head.append(html`
  <style>
    li.selected { font-weight: bold }
  </style>
`);

(function update() {
  console.time('update');
  main.replaceChildren(
    html`<h3>Hello Tagged HTML 👋</h3>`,
    html`
      <ul>
        ${['just', '<some>', 'list'].map(
          (content, i) => html`
            <li
              onclick=${() => {
                selected = i;
                update();
              }}
              class=${i === selected ? 'selected' : ''}
              style='padding:8px'
            >
              ${content}
            </li>
          `
        )}
      </ul>
    `,
    html`<hr />`
  );
  console.timeEnd('update');
}());
