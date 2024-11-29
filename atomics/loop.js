// loop from https://github.com/bddicken/languages
export default u => {
  console.time('loop');
  let r = Math.floor(Math.random() * 10000);
  let a = new Int32Array(10000);
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 100000; j++) {
      a[i] += j % u;
    }
    a[i] += r;
  }
  console.timeEnd('loop');
  return a[r];
}
