var myTool = (function () {
  //获取当前样式
  function getStyle(el, attr) {
    return getComputedStyle
      ? getComputedStyle(el)[attr]
      : el.cuttentStyle[attr];
  }
  //缓动动画
  function getMove(el, attr, target) {
    clearInterval(el.timer);
    el.timer = setInterval(function () {
      if (attr == "opacity") {
        var cur = Math.round(getStyle(el, attr) * 100);
      } else {
        var cur = parseInt(getStyle(el, attr));
      }
      if (cur > 0) {
        var speed = Math.ceil((target - cur) / 10);
      } else {
        var speed = Math.floor((target - cur) / 10);
      }
      if (attr == "opacity") {
        if ((cur + speed) / 100 <= 0.09) {
          el.style.opacity = 0;
        } else {
          el.style.opacity = (cur + speed) / 100;
          el.style.filter = `alpha(opacity=${(cur = speed)})`;
        }
      } else {
        el.style[attr] = speed + cur + "px";
      }

      if (cur == target) clearInterval(el.timer);
    }, 30);
  }
  function getCode(n) {
    var code = [];
    var arr = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
    ];
    for (var i = 0; i < n; i++) {
      code += arr[Math.floor(Math.random() * arr.length)];
    }
    return code;
  }
  //获取某个元素到顶部距离
  function getTop(el) {
    var top = 0;
    while (el.offsetParent) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return top;
  }
  //设置全屏
 function fullScroll(el){
  if (el.requestFullscreen) {
    el.requestFullscreen();
   }
   else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
   }
   else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
   }
   else if (docElm.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
   }
 }
 //退出全屏
 function exitScroll(){
  if (document.exitFullscreen) {
    document.exitFullscreen();
   }
   else if (document.msExitFullscreen) {
    document.msExitFullscreen();
   }
   else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
   }
   else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
   }
 }
 
  return {
    'getCode': getCode,
    'getMove': getMove,
    'getTop':getTop,
    'fullScroll':fullScroll,
    'exitScroll':exitScroll
  };
})();
