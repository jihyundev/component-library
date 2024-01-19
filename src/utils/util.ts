const throttle = (func: () => void, delay: number) => {
  let timer;
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      func();
    }, delay);
  }
};

export { throttle };
