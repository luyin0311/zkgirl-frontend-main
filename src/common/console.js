/* eslint-disable no-inner-declarations */
if (/console/g.test(location.href)) {
  const url = 'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js';
  let vconsole;
  function loadScript(src, cb) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;

    let flag = false; // 防止 IE9/10 中执行两次

    script.onload = script.onreadystatechange = function () {
      if (flag === false && (!this.readyState || this.readyState === 'complete')) {
        flag = true;
        if (cb) {
          cb();
        }
      }
    };
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  }

  loadScript(url, function () {
    if (typeof vconsole === 'undefined') {
      // eslint-disable-next-line
      vconsole = new VConsole();
    }
  });
}
