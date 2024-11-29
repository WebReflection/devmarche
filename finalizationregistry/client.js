const random = path => fetch(`${path}?_=${Math.random()}`);
const text = response => response.text();

setTimeout(
  async () => {
    const [a, b, c] = await Promise.all([
      random('/index.js').then(text),
      random('/index.js').then(text),
      random('/index.js').then(text),
    ]);
    console.log(a.length, b.length, c.length);
  },
  2000
);
