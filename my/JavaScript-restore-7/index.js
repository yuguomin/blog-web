void function () {
  window.addEventListener('load', () => {
    const $btn = document.querySelector('.test-then-block .btn');
    const $svg = document.querySelector('.test-then-block .rotating');
    const $result = document.querySelector('.test-then-block .result');

    $btn.addEventListener('click', btnClick);

    function btnClick() {
      $btn.removeEventListener('click', btnClick);
      toggleSvgStatus('');
      timeout(2000)
      .then((value) => {
        toggleSvgStatus(`resolve ${value}`);
        $btn.addEventListener('click', btnClick);
        console.log(`resolve: ${value}`);
      }, (value) => {
        toggleSvgStatus(`reject ${value}`);
        $btn.addEventListener('click', btnClick);
        console.log(`reject: ${value}`);
      })
    }
    
    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const result = Math.random();
          if (result >= 0.5) {
            resolve(result)
          } else {
            reject(result);
          }
        }, ms)
      })
    }

    function toggleSvgStatus(value) {
      $svg.classList[$svg.classList.contains('show') ? 'remove' : 'add']('show');
      $result.innerText = value;
    }
  })
}();