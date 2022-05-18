window.onload = function () {
  //自定义滚轮
  var scroll = document.getElementById("scroll");
  var scrollCon = document.getElementById("scrollcon");
  var bar = scroll.getElementsByClassName("bar")[0];
  var slider = scroll.getElementsByClassName("slider")[0];
  var scrBox = document.getElementsByClassName("open_class_right")[0];
  var oA = scroll.getElementsByTagName("a");
  slider.onmousedown = function (ev) {
    var y = ev.offsetY;
    document.onmousemove = function (ev) {
      var pgy = ev.pageY - y - myTool.getTop(bar);
      var conN = move(pgy);
      getScale(conN);
      //内容跟随
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  };
  //函数封装
  function getScale(conN) {
    var scaleY = conN / (bar.offsetHeight - slider.offsetHeight);
    scrollCon.style.top =
      -scaleY * (scrollCon.offsetHeight - scrBox.offsetHeight) + "px";
  }
  function move(n) {
    if (n <= 0) {
      n = 0;
    } else if (n >= bar.offsetHeight - slider.offsetHeight) {
      n = bar.offsetHeight - slider.offsetHeight;
    }
    slider.style.top = n + "px";
    return n;
  }
  //上下按键滚动
  oA[0].onmousedown = function () {
    timer = setInterval(function () {
      //使用滑块offsetTop来控制滑块的位置
      var con = move(slider.offsetTop - 20);
      getScale(con);
    }, 20);
  };
  oA[0].onmouseup = function () {
    clearInterval(timer);
  };
  oA[1].onmousedown = function () {
    timer1 = setInterval(function () {
      //使用滑块offsetTop来控制滑块的位置
      var con = move(slider.offsetTop + 20);
      getScale(con);
    }, 20);
  };
  oA[1].onmouseup = function () {
    clearInterval(timer1);
  };
  //滚轮滚动

  function slMove(ev) {
    var bDown = true;
    //兼容火狐 比较运算符来判断往上还是往下，true为下
    bDown = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
    if (bDown) {
      //使用滑块offsetTop来控制滑块的位置
      var con = move(slider.offsetTop + 20);
      getScale(con);
    } else {
      var con = move(slider.offsetTop - 20);
      getScale(con);
    }
    ev.preventDefault();
  }

  scrBox.addEventListener("mousewheel", slMove);
  scrBox.addEventListener("DOMMouseScroll", slMove);
  //讨论模块
  var talk = document
    .getElementsByClassName("play_banner_li")[0]
    .getElementsByTagName("li");
  var playTalk = document.getElementsByClassName("play_talk")[0];
  talk[0].onmouseenter = function () {
    playTalk.style.display = "none";
    scrBox.style.display = "block";
  };
  talk[1].onmouseenter = function () {
    text.value = "";
    playTalk.style.display = "block";
    scrBox.style.display = "none";
  };
  var msg = document.getElementById("msg");
  var msHtml = "";
  var oIn = playTalk.getElementsByTagName("input")[0];
  var text = playTalk.getElementsByTagName("textarea")[0];
  for (var i = 0; i < commentList.length; i++) {
    msHtml += `<div class="play_message">
    <ul class="clearfix">
        <li><img  class="play_message_1" src='${commentList[i].src}' alt=""> <span class="play_message_2">${commentList[i].name}</span><span
                class="time">${commentList[i].time}</span>
        </li>
    </ul>
    <p>${commentList[i].content}</p>
</div>`;
  }
  msg.innerHTML = msHtml;
  function getTime() {
    var Time = new Date();
    var h = Time.getHours();
    var m = Time.getMinutes();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    var nowTime = `${h}:${m}`;
    return nowTime;
  }
  oIn.onclick = function () {
    var txt = text.value;
    var html = "";
    if (!txt) {
      alert("请输入内容");
      return;
    }
    var playMsg = document.createElement("div");
    playMsg.className = "play_message";
    html = `<ul class="clearfix">
    <li><img  class="play_message_1" src="./img/login/user.png" alt=""> <span class="play_message_2">哈哈哈</span><span
       class="time">${getTime()}</span>
    </li>
</ul>
<p>${txt}</p>`;
    playMsg.innerHTML = html;
    var mscon = msg.children;
    msg.insertBefore(playMsg, mscon[0]);
    text.value = "";
  };
  //授课师资
  var teacher = document.getElementsByClassName("center_module")[0];
  var html = "";
  //视频播放
  var pVideo = document.getElementsByClassName("play_img")[0];
  var tBar = pVideo.getElementsByClassName("tabbar")[0];
  var playBar = tBar.getElementsByClassName("bar")[0];
  var oV = pVideo.getElementsByTagName("video")[0];
  var loder = tBar.getElementsByClassName("loader")[0];
  pVideo.onmouseenter = function () {
    tBar.style.bottom = 10 + "px";
  };
  pVideo.onmouseleave = function () {
    tBar.style.bottom = -40 + "px";
  };
  //暂停播放按钮
  var star = pVideo.getElementsByClassName("star")[0];
  star.onclick = function () {
    if (oV.paused) {
      star.className = "star iconfont icon-kaishibofang";
      oV.play();
    } else {
      star.className = "star iconfont icon-kaishibofang1";
      oV.pause();
    }
  };
  //时间显示
  var oTime = pVideo.getElementsByClassName("time");
  var nTime = oV.duration;
  function nowTime(nTime) {
    var m = parseInt(nTime / 60);
    var s = parseInt(nTime % 60);
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return `00:${m}:${s}`;
  }
  //音量增加减少
  var voUp = tBar.getElementsByClassName("up")[0];
  var voDown = tBar.getElementsByClassName("down")[0];
  var x = 0.1;
  voUp.onclick = function () {
    x += 0.1;
    if (x >= i) {
      x = 1;
    }
    oV.volume = x;
  };
  voDown.onclick = function () {
    x -= 0.1;
    if (x <= 0) x = 0;
    oV.volume = x;
  };
  oTime[1].innerHTML = nowTime(nTime);
  //视频播放事件
  oV.ontimeupdate = function () {
    var cuttime = oV.currentTime;
    oTime[0].innerHTML = `${nowTime(cuttime)}/`;
    //滚动条跟随
    var scale = cuttime / oV.duration;
    loder.style.width = scale * playBar.offsetWidth + "px";
  };
  //点击滚动条
  playBar.onmousedown = function (ev) {
    star.className = "star iconfont icon-kaishibofang";
    oV.play();
    var offx = ev.offsetX;
    loder.style.width = offx + "px";
    var scaleX = offx / playBar.offsetWidth;
    oV.currentTime = scaleX * oV.duration;
  };
  //全屏
  var fullS = pVideo.getElementsByClassName("fullscroll")[0];
  var timer2 = null;
  fullS.onclick = function () {
    var flag = true; //默认为没有全屏
    if (document.fullscreenElement) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      pVideo.onmousemove = function () {
        pVideo.style.cursor = "default";
        tBar.style.bottom = 0;
        //防抖
        if (timer2) clearTimeout(timer2);
        timer2 = setTimeout(function () {
          pVideo.style.cursor = "none";
          tBar.style.bottom = -40 + "px";
        }, 2000);
      };
      myTool.fullScroll(pVideo);
    } else {
      clearTimeout(timer2);
      myTool.exitScroll();
      pVideo.onmousemove = null;
    }
    document.onresize = function () {
      clearTimeout(timer2);
      pVideo.onmousemove = null;
    };
  };
  //播放结束
  oV.onended = function () {
    oV.currentTime = 0;
    star.className = "star iconfont icon-kaishibofang1";
    oV.pause();
  };
  //目录渲染
  var menu = document.getElementById("scrollcon");
  menuHtml = "";
  for (var a = 0; a < classList.length; a++) {
    menuHtml += `<div class="open_class_discuss">
    <h3>${classList[a].title}<span></span></h3>
    <ul class="clearfix">
    `;
    for (var j = 0; j < classList[a].num; j++) {
      menuHtml += `<li>${classList[a].list[j].name}<a href="javascript:;" _src="${classList[a].list[j].src}" class="icon-conneection play_font"></a></li>`;
    }
    menuHtml += `</ul>
    </div>`;
  }
  menu.innerHTML = menuHtml;
  //课程目录渲染
  var openClass = document.getElementsByClassName("open_class")[0];
  var openHtml = "";

  for (var n = 0; n < classList.length; n++) {
    openHtml += ` <div class="open_class_first">
    <h3>${classList[n].title}<span class="close"></span></h3>
    <ul class="clearfix" >`;
    for (var k = 0; k < classList[n].num; k++) {
      openHtml += ` <li><a href="javascript:;"_src="${
        classList[n].list[k].src
      }" ></a>${classList[n].list[k].name}<div class="${
        classList[n].list[k].isStudy ? "over0" : ""
      }">${classList[n].list[k].isStudy ? "已学完" : ""}</div> <span>${
        classList[n].list[k].time
      }开播</span></li>`;
    }
    openHtml += `</ul>
    </div>`;
  }
  openClass.innerHTML = openHtml;
  var full = document
    .getElementsByClassName("lastbanner")[0]
    .getElementsByTagName("a")[0];

 
  //展开收起
  var close = openClass.getElementsByClassName("close");
  var oUl = openClass.getElementsByTagName("ul");


  for (var l = 0; l < close.length; l++) {
    close[l].index = l;
    close[l].flag=true;
    close[l].onclick = function () {
      if (close[this.index].flag) {
        oUl[this.index].style.height = "auto";
        close[this.index].className='close on'
       
      } else {
        oUl[this.index].style.height = 0;
        close[this.index].className='close '
      }
      full.onclick()
      close[this.index].flag = !close[this.index].flag;
      
    };
  }
  full.onclick = function () {
    openClass.style.height = "auto";
  };
};
