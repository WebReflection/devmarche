export const show = content => {
  postMessage({ action: 'show', content });
};

export const wait = () => {
  const content = new Int32Array(
    new SharedArrayBuffer(
      Int32Array.BYTES_PER_ELEMENT
    )
  );
  postMessage({ action: 'wait', content });
  Atomics.wait(content, 0);
};
