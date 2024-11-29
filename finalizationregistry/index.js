const fr = new FinalizationRegistry(
  held => {
    console.log({ held });
  }
);

const addComment = content => {
  const text = main.appendChild(
    document.createTextNode(content)
  );

  const held = `${content} is gone`;

  // fr.register(text, held); /*
  const token = {};
  fr.register(text, held, token);
  return token;
  //*/
};

// addComment('erase me'); /*
const token = addComment('erase me');
if (token) {
  setTimeout(() => {
    fr.unregister(token);
  });
}
//*/
