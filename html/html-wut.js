// @ts-check

const { ATTRIBUTE_NODE, COMMENT_NODE, ELEMENT_NODE } = document;

/**
 * @param {Node} node
 * @returns {number[]}
 */
const getPath = node => {
  const path = []
  while (node.parentNode) {
    path.unshift(
      path.indexOf.call(
        node.parentNode.childNodes,
        node
      )
    );
    node = node.parentNode;
  }
  return path;
};

/** @typedef {[ATTRIBUTE_NODE | COMMENT_NODE, string, number[]]} Detail */
/** @typedef {[DocumentFragment, Detail[]]} Parsed */

/** @type {WeakMap<TemplateStringsArray, Parsed>} */
const parsed = new WeakMap;

/**
 * @param {TemplateStringsArray} template
 * @param  {...any} values
 * @returns {DocumentFragment}
 */
export default (template, ...values) => {
  if (!parsed.has(template)) {  // ◁━━━━━━━━━━━━━━━━━━━━ WUT ? ━━━━━━━━━━━┓
    const uid = String(Math.random());                                 //  ┃
    const hole = `<!--${uid}-->`;                                       // ┃
    const html = template.join(hole).trim();                            // ┃
    const tpl = document.createElement('template');                     // ┃
    tpl.innerHTML = html.replaceAll(`=${hole}`, `="${uid}"`);           // ┃
                                                                        // ┃
    const { content } = tpl;                                            // ┃
    const tw = document.createTreeWalker(content, 1 | 128);             // ┃
    const /** @type {Detail[]} */ details = [], drop = [];              // ┃
                                                                        // ┃
    let node;                                                           // ┃
    while ((node = tw.nextNode())) {                                    // ┃
      switch (node.nodeType) {                                          // ┃
        case ELEMENT_NODE: {                                            // ┃
          for (const attr of node.attributes) {                         // ┃
            if (attr.value === uid || attr.value === hole) {            // ┃
              details.push([ATTRIBUTE_NODE, attr.name, getPath(node)]); // ┃
              drop.push(attr);                                          // ┃
            }                                                          //  ┃
          }                                                           //   ┃
        }                                                             //   ┃
        case COMMENT_NODE: {                                          //   ┃
          if (node.data === uid) {                                    //   ┃
            details.push([COMMENT_NODE, '#comment', getPath(node)]);  //   ┃
          }                                                           //   ┃
        }                                                           //     ┃
      }                                                          //        ┃
    }                                                        //            ┃
                                                         //                ┃
    for (const attr of drop)                         //                    ┃
      attr.ownerElement.removeAttributeNode(attr); //                      ┃
                                                   //   ┏━━━━━━━━━━━━━━━━━━┛
    parsed.set(template, [content, details]);      //◁━┫ W
  }                                                //   ┃ U
                                                   //   ┃ T
  const [content, details] = parsed.get(template); // ━━┛ ?
  const fragment = content.cloneNode(true);
  for (let i = 0; i < values.length; i++) {
    const [type, name, path] = details[i];
    const node = path.reduce((node, i) => node.childNodes[i], fragment);
    let value = values[i];
    if (type === ATTRIBUTE_NODE) {
      if (name in node) node[name] = value;
      else node.setAttribute(name, value);
    }
    else {
      if (Array.isArray(value)) {
        const f = document.createDocumentFragment();
        f.replaceChildren(...value);
        value = f;
      }
      else {
        value = document.createTextNode(
          value == null ? '' : String(value)
        );
      }
      node.replaceWith(value);
    }
  }

  return fragment;
};
