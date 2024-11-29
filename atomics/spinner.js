export default class Spinner {
  static #symbols = [...'▁▂▃▄▅▆▇█▇▆▅▄▃▂'];
  #animate = () => {
    const symbols = Spinner.#symbols;
    const { length } = symbols;
    this.#target.textContent = symbols[this.#i++ % length];
    this.#raf = requestAnimationFrame(this.#animate);
  };
  #target;
  #raf = 0;
  #i = 0;
  constructor(target) {
    this.#target = target;
  }
  start() {
    if (!this.#raf) this.#animate();
    return this;
  }
  stop() {
    cancelAnimationFrame(this.#raf);
    this.#raf = 0;
    this.#i = 0;
    return this;
  }
}
