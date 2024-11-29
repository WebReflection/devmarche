// @ts-nocheck

import { show } from '../tag/utils.js';

// basic
const proxied = {
  name: 'Andrea',
  surname: 'Giammarchi',
  fullName() {
    return `${this.name} ${this.surname}`;
  }
};

const handler = {} || Reflect;

const proxy = new Proxy(proxied, handler);

show(proxy.fullName());
console.log(proxy === proxied); // false !!!
debugger;



// Proxy Traps - https://gist.github.com/WebReflection/58ce94a0d2c4118a4f3f26934c9582f4#traps-vs-proxy-types
// ---------------------------
// apply                      proxied(...args)
// construct                  new proxied
// defineProperty             Object.defineProperty(proxied, key, descriptor)
// deleteProperty             delete proxied.key || delete proxied[key]
// get                        proxied.key || proxied[key]
// getOwnPropertyDescriptor   Object.getOwnPropertyDescriptor(proxied, key)
// getPrototypeOf             Object.getPrototypeOf(proxied) - instanceof
// has                        key in proxied
// isExtensible               Object.isExtensible(proxied)
// ownKeys                    Reflect.ownKeys(proxied)
// preventExtensions          Object.preventExtensions(proxied)
// set                        proxied.key = value || proxied[key] = value
// setPrototypeOf             Object.setPrototypeOf(proxied, proto)

// Bound Example
const bound = target => new Proxy(target, {
  get: (target, key) => target[key].bind(target)
});

const { append, prepend } = bound(document.body);
prepend('a', 'b', 'c');
append('d', 'e', 'f');
debugger;



// LocalStorage Example
class Storage {
  constructor(prefix = 'storage') {
    return new Proxy(this, new StorageHandler(prefix));
  }
}

class StorageHandler {
  #prefix;
  constructor(prefix) {
    this.#prefix = prefix;
  }
  get(_, key) {
    const item = `${this.#prefix}.${key}`;
    const value = localStorage.getItem(item);
    if (typeof value === 'string') {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed) {
        return Object.assign(
          new Proxy(parsed, new StorageHandler(item)),
          parsed
        );
      }
      return parsed;
    }
  }
  has(_, key) {
    const item = `${this.#prefix}.${key}`;
    return typeof localStorage.getItem(item) === 'string';
  }
  set(_, key, value) {
    const item = `${this.#prefix}.${key}`;
    localStorage.setItem(item, JSON.stringify(value));
    return true;
  }
}

// Example
const storage = new Storage;

// first time only
if (!('user' in storage)) {
  storage.user = {
    ...proxy,
    age: 46,
  };
}

console.log(`${storage.user.name} ha ${storage.user.age} anni`);

show(
  JSON.stringify(
    storage.user,
    null,
    '  '
  )
);
