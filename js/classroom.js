window.onload = function () {
  //渲染内容
  var cont = document.getElementById("cont");
  var onlineData = online;
  var pageCount = Math.ceil(onlineData.length / 12);
  var n = 0;
  var pUl = document
    .getElementsByClassName("pageNum")[0]
    .getElementsByTagName("ul")[0];
  var data = onlineData.slice(n * 12, (n + 1) * 12);
  var oLi = pUl.getElementsByTagName("li");
  var btn = document
    .getElementsByClassName("pageNum")[0]
    .getElementsByTagName("button");
  //数据渲染函数
  num(data);
  function num(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
      html += ` <div class="hot">
         <img src="${data[i].src}" alt="人教版精选语文课程">
         <div class="Small_module ">
             <span class="test">${data[i].num}人在学习</span>
             <h3>${data[i].title}</h3>
             <p>${data[i].time}课时</p>
             <span><a href="javascript:;">${
               data[i].isFree ? "免费学习" : "点击报名"
             }</a></span>
         </div>
     </div>`;
    }
    cont.innerHTML = html;
  }
  //添加列表
  page(pageCount);
  function page(num) {
    var html = "";
    for (var i = 0; i < num; i++) {
      html += `<li>${i + 1}</li>`;
    }
    pUl.innerHTML = html;
  }
  //设置颜色
  color();
  function color() {
    if (data.length == 0) {
      return;
    }
    for (var i = 0; i < oLi.length; i++) {
      oLi[i].className = "";
    }
    oLi[n].className = "active";
  }
  //上一和下一页
  btnColor();
  function btnColor() {
    for (var i = 0; i < btn.length; i++) {
      btn[i].style.color = "#ccc";
    }
    if (n > 0 && n < oLi.length) {
      btn[0].style.color = "#000";
    }
    if (n < oLi.length - 1) {
      btn[1].style.color = "#000";
    }
  }
  //点击翻页
  btn[0].onclick = function () {
    if (n <= 0) {
      alert("已经到第一页了");
      return;
    }
    n--;
    data = onlineData.slice(n * 12, (n + 1) * 12);
    num(data);
    color();
    btnColor();
  };
  btn[1].onclick = function () {
    if (n < oLi.length - 1) {
      n++;
      data = onlineData.slice(n * 12, (n + 1) * 12);
      num(data);
      color();
      btnColor();
    } else {
      alert("到最后一页了");
    }
  };
  //点击翻页
  getClick()
  function getClick(){
    for (var i = 0; i < oLi.length; i++) {
      oLi[i].onclick = function () {
        for (var j = 0; j < oLi.length; j++) {
          oLi[j].index = j;
        }
        n = this.index;
        data = onlineData.slice(n * 12, (n + 1) * 12);
        num(data);
        color();
        btnColor();
      };
    }
  }
  //渲染筛选数据
  var menu = document.getElementById("filter").getElementsByTagName("a");
  for (var j = 0; j < menu.length; j++) {
    menu[j].onclick = function () {
      var obj = this.getAttribute("obj");
      var menuData = onlineData.filter(function (item) {
        return obj == 1 ? true : item.subject == obj;
      });
      pageCount = Math.ceil(menuData.length / 12);
      n = 0;
      data = menuData.slice(n * 12, (n + 1) * 12);
     
      page(pageCount);
      num(data);
      color();
      btnColor();
      getClick()
    };
  }
};
