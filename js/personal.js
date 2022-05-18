window.onload = function () {
  var menu = document
    .getElementsByClassName("personal_left")[0]
    .getElementsByClassName("delta");
  var change = document.getElementsByClassName("personal_class");
  for (var i = 0; i < menu.length; i++) {
    menu[i].index = i;
    change[i].flag = true;
    menu[i].onclick = function () {
      if (change[this.index].flag) {
        change[this.index].style.height = "auto";
      } else {
        change[this.index].style.height = "40px";
      }
      change[this.index].flag = !change[this.index].flag;
    };
  }

  var safe=document.getElementsByClassName('personal_safe_none')[0];
  var files=document.getElementsByClassName('head_none')[0];
  var oA=document.getElementsByClassName('archives')[0].getElementsByTagName('a');
  oA[0].onclick=function(){
    files.style.display='block';
    safe.style.display='none';
  }
  oA[1].onclick=function(){
    files.style.display='none';
    safe.style.display='block';
  }
};
