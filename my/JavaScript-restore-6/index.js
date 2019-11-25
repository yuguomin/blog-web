void function () {
  window.addEventListener('load', () => {
    // block js
    const loadEle = document.querySelector('.load');
    const addEle = document.querySelector('.add');
    const countEle = document.querySelector('.count');

    let count = 0;
    countEle.innerText = count;
    loadEle.addEventListener('click', () => {
      let index = 0;
      while (index <= 4000000000) {
        if (index === 0) {
          console.log('running');
        }
        if (index === 1000000000) {
          console.log('xxx.js is ok;');
        }
        if (index === 2200000000) {
          console.log('zzz.css is ok;');
        }
        if (index === 4000000000) {
          console.log('ooo.png is ok;');
          status = true;
        }
        index++;
      }
    });
    addEle.addEventListener('click', () => {
      count += 1;
      countEle.innerText = count;
    });



    // microTack
    const $outer = document.querySelector('.test-task .outer');
    const $inner = document.querySelector('.test-task .inner');
    const $clear = document.querySelector('.test-task .clear');
    const $selfCall = document.querySelector('.test-task .self-call');
    const $result = document.querySelector('.test-task .result');
    new MutationObserver(function () {
      console.log('observer');
    }).observe($outer, {
      attributes: true
    });

    function hander() {
      console.log('click'); // 直接执行

      Promise.resolve().then(_ => console.log('promise')); // 注册 MicroTask

      setTimeout(_ => console.log('timeout'), 0); // 注册 Task

      $outer.setAttribute('data-random', Math.random()); // 触发 MutationObserver 注册 MicroTask

      $result.innerText = 
      `'click'\n'promise'\n'observer'\n'click'\n'promise'\n'observer'\n'timeout'\n'timeout`;
    }

    $inner.addEventListener('click', hander);
    $outer.addEventListener('click', hander);


    $clear.addEventListener('click', () => {
      $result.innerText = '';
    });

    $selfCall.addEventListener('click', () => {
      $inner.click();
      $result.innerText = `'click'\n'click'\n'promise'\n'observer'\n'promise'\n'timeout'\n'timeout'`
    })
  })
}();