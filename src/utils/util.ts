
const throttle = (func: Function, delay: number) => {
  let timer;
  if (!timer) {
    timer = setTimeout(function() {
      timer = null
      func()
    }, delay)
  }
}

export { throttle }