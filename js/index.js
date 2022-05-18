window.onload = function () {
  //轮播图模块
  var banner = document.getElementsByClassName("banner")[0];
  var bannav = document
    .getElementsByClassName("bannav")[0]
    .getElementsByTagName("ul")[0];

  for (var i = 0; i < bannerData.length; i++) {
    bannav.innerHTML += `<li class="">${bannerData[i].title}</li>`;
    banner.innerHTML += ` <h2><a href="javascript:;"><img src='${bannerData[i].src} 'alt="banner"></a>
   </h2>`;
  }
  //轮播图添加鼠标经过事件
  var bannerImg = banner.getElementsByTagName("h2");
  var bannavLi = bannav.getElementsByTagName("li");
  for (var i = 0; i < bannavLi.length; i++) {
    bannavLi[i].index = i;
    bannavLi[i].onmouseenter = function () {
      for (var i = 0; i < bannavLi.length; i++) {
        bannavLi[i].className = "";
        this.className = "on";
        myTool.getMove(bannerImg[i], "opacity", 0);
        myTool.getMove(bannerImg[this.index], "opacity", 100);
      }
    };
    bannavLi[i].onmouseleave = function () {
      for (var i = 0; i < bannavLi.length; i++) {
        bannavLi[i].className = "";
      }
    };
  }
  //轮播图自动播放
  var timer = null;
  var j = 0;
  function auto() {
    var arr = [];
    for (var i = 0; i < bannavLi.length; i++) {
      arr.push(i);
      myTool.getMove(bannerImg[i], "opacity", 0);
    }
    myTool.getMove(bannerImg[arr[j]], "opacity", 100);
    ++j;
    if (j >= bannerImg.length) {
      j = 0;
    }
  }
  var banOut = document.getElementById("bannerMove");
  timer = setInterval(auto, 2000);
  banOut.onmouseenter = function () {
    clearInterval(timer);
  };
  banOut.onmouseleave = function () {
    timer = setInterval(auto, 2000);
  };
  //同步课程渲染
  var lessonCon = document.getElementsByClassName("recommend")[0];
  var html = "";

  for (var i = 0; i < lesson.online.length; i++) {
    html += ` <div class="hot">
    <img src="${lesson.online[i].src}" alt="人教版精选语文课程">
    <div class="Small_module">
        <span>${lesson.online[i].cont}</span><span>${
      lesson.online[i].num
    }</span>
        <h3>${lesson.online[i].title}</h3>
        <p>${lesson.online[i].time}课时</p>
        <span><a href="#">${
          lesson.online[i].isFree ? "免费学习" : "点击报名"
        }</a></span>
    </div>
</div>`;
  }
  lessonCon.innerHTML = html;

  //在线测试渲染
  var test = document.getElementById("test");
  var tHtml = "";
  for (var i = 0; i < lesson.test.length; i++) {
    tHtml += `<div class="hot">
    <img src="${lesson.test[i].src}" alt="人教版精选语文课程">
    <div class="Small_module ">
        <span>${lesson.test[i].cont}</span><span class="test">${lesson.test[i].num}人已经考试 <em>${lesson.test[i].time}</em> </span>
        <h3>${lesson.test[i].title}</h3>
        <span><a href="#">去考试</a></span>
    </div>
</div>`;
  }
  test.innerHTML = tHtml;
  //精品课程渲染
  var goods = document.getElementsByClassName("great_left")[0];
  var gHtml = "";
  for (var i = 0; i < lesson.good.length; i++) {
    gHtml += `<div class="hot">
    <img src="${lesson.good[i].src}" alt="人教版精选语文课程">
    <div class="Small_module">
        <span>${lesson.good[i].cont}</span>
        <span>${lesson.good[i].num}</span>
        <h3>${lesson.good[i].title}</h3>
        <p>${lesson.good[i].time}课时</p>
        <span><a href="#">${
          lesson.good[i].isFree ? "免费学习" : "点击报名"
        }</a></span>
    </div>
</div>`;
  }
  goods.innerHTML = gHtml;
};
