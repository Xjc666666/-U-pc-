(function () {
  //登录页面
  var oLogin = document
    .getElementsByClassName("login_a")[0]
    .getElementsByTagName("a");
  var subBox = document.getElementsByClassName("submit_box")[0];
  var lgBox = document.getElementsByClassName("box")[0];
  var subDel = document.getElementById("subdel");
  var lgDel = document.getElementById("lgdel");
  var goSub = document
    .getElementsByClassName("user")[0]
    .getElementsByTagName("a")[0];
  var goLog = document
    .getElementsByClassName("user_agreement1")[0]
    .getElementsByTagName("a")[0];
  oLogin[0].onclick = function () {
    lgBox.style.display = "block";
  };
  subDel.onclick = function () {
    subBox.style.display = "none";
  };
  oLogin[1].onclick = function () {
    subBox.style.display = "block";
  };
  lgDel.onclick = function () {
    lgBox.style.display = "none";
  };
  goSub.onclick = function () {
    subBox.style.display = "block";
    lgBox.style.display = "none";
  };
  goLog.onclick = function () {
    subBox.style.display = "none";
    lgBox.style.display = "block";
  };
  //注册验证页面
  var telReg = /^1[3-9]\d{9}$/;
  var psReg = /(?!^[0-9]{6,15}$)(?!^[a-zA-Z]{6,15}$)(^[a-zA-z0-9]{6,15}$)/;
  var regCode = document.getElementsByClassName("regcode")[0];
  //验证码
  regCode.innerHTML = myTool.getCode(4);
  regCode.onclick = function () {
    regCode.innerHTML = myTool.getCode(4);
  };
  //验证手机号
  var telNum = document
    .getElementsByClassName("tips1")[0]
    .getElementsByTagName("input")[0];
  var pwd = document
    .getElementsByClassName("tips2")[0]
    .getElementsByTagName("input")[0];
  var pwdReg = document
    .getElementsByClassName("tips3")[0]
    .getElementsByTagName("input")[0];
  var userCode = document
    .getElementsByClassName("tips4")[0]
    .getElementsByTagName("input")[0];
  var tips1 = document.getElementsByClassName("tips1")[0];
  var tips2 = document.getElementsByClassName("tips2")[0];
  var tips3 = document.getElementsByClassName("tips3")[0];
  var tips4 = document.getElementsByClassName("tips4")[0];
  var arr = [false, false, false, false];
  telNum.onchange = function () {
    if (telReg.test(telNum.value)) {
      arr[0] = true;
      telNum.style.borderColor = "#80c4ae";
      tips1.className = "tips1";
    } else {
      arr[0] = false;
      tips1.className = "tips1 tips1wrong";
      telNum.style.borderColor = "red";
    }
  };
  pwd.onchange = function () {
    if (psReg.test(pwd.value)) {
      arr[1] = true;
      pwd.style.borderColor = "#80c4ae";
      tips2.className = "tips2";
    } else {
      arr[1] = false;
      tips2.className = "tips2 tips2wrong";
      pwd.style.borderColor = "red";
    }
  };
  //判断密码是否相同
  pwdReg.onchange = function () {
    if (pwd.value == pwdReg.value) {
      arr[2] = true;
      tips3.className = "tips3";
      pwdReg.style.borderColor = "#80c4ae";
    } else {
      arr[2] = false;
      tips3.className = "tips3 tips3wrong";
      pwdReg.style.borderColor = "red";
    }
  };
  userCode.onchange = function () {
    if (userCode.value.toLowerCase() == regCode.innerHTML.toLowerCase()) {
      arr[3] = true;
      tips4.className = "tips4 code";
      userCode.style.borderColor = "#80c4ae";
    } else {
      regCode.innerHTML = myTool.getCode(4);
      tips4.className = "tips4 code tips4wrong";
      userCode.style.borderColor = "red";
    }
  };
  var aSub = document.getElementById("aSub");
  aSub.onsubmit = function () {
    return false;
  };
  aSub.onclick = function () {
    var flag = arr.every(function (item) {
      return item;
    });
    if (flag) {
      var json = localStorage.getItem("users");
      var user = {
        userName: telNum.value,
        password: pwd.value,
      };
      if (json) {
        var users = JSON.parse(json);
        users.push(user);
      } else {
        var users = [];
        users.push(user);
      }
      for (var i = 0; i < arr.length; i++) {
        arr[i] = false;
      }
      localStorage.setItem("users", JSON.stringify(users));
      alert("注册成功");
      lgBox.style.display = "block";
      subBox.style.display = "none";
    } else {
      alert("注册失败,请检查");
    }

    telNum.value = "";
    pwd.value = "";
    pwdReg.value = "";
    userCode.value = "";
    regCode.innerHTML = myTool.getCode(4);
  };
  //登录页面
  var lgBtn = document.getElementById("lgbtn");
  var lgName = document.getElementById("lgname");
  var lgPwd = document.getElementById("lgpwd");
  var lga = document.getElementsByClassName("login_a")[0];
  var userCenter = document.getElementsByClassName("usercenter")[0];
  var out = document
    .getElementsByClassName("out")[0]
    .getElementsByTagName("a")[0];

  lgBtn.onclick = function () {
    if (localStorage.getItem("users"))
      var users = JSON.parse(localStorage.getItem("users"));
    var lgflag = false;
    var pwdflag = false;
    //用本地存储的数据来证伪
    for (var i = 0; i < users.length; i++) {
      if (users[i].userName == lgName.value) {
        lgflag = true;
        if (users[i].password == lgPwd.value) {
          pwdflag = true;
        }
      }
    }
    if (!lgflag) {
      alert("请先注册");
    } else if (lgflag && !pwdflag) {
      alert("密码错误请检查");
    } else if (lgflag && pwdflag) {
      //注册成功就在本地存一个 "successful"
      localStorage.setItem("successful", "successful");
      location.reload();
      alert("登录成功");
    }
  };
  //退出就删除  "successful"
  out.onclick = function () {
    localStorage.removeItem("successful");
    location.reload();
  };
  //根据"successful"来判断登录状态
  if (localStorage.getItem("successful")) {
    lga.style.display = "none";
    userCenter.style.display = "block";
  } else {
    lga.style.display = "block";
    userCenter.style.display = "none";
  }
 
})();
