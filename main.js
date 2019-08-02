var container = document.getElementById('container');
var lastBox;//用于存放上一次变化的box，使鼠标移出container或者移入box之间的空白处时，将图片还原，文字隐藏

//事件代理，只用给container添加一个监听器就可以监听三个box
container.onmouseover = function (ev) {
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if (target.className == 'box') {
    lastBox = target;
    var pre = target.querySelector('.pre');
    var img = target.querySelector('img');
    img.setAttribute('style', 'opacity: 0;');
    pre.setAttribute('style', 'opacity: 1;');
  }
  //鼠标在box之间的空白处且lastBox被赋值
  if (target.id == 'container' && lastBox) {
    leave();
  }
}

//鼠标移出container且lsatBox被赋值
container.onmouseleave = function(){
  if(lastBox){
    leave();
  }
}

//恢复图片不透明度为1，文字不透明度为0
function leave(){
  var pre = lastBox.querySelector('.pre');
  var img = lastBox.querySelector('img');
  img.setAttribute('style', 'opacity: 1;');
  pre.setAttribute('style', 'opacity: 0;');
}

//和上面一样的操作
var qrFrame = document.getElementById('qrFrame');
var qrCode = document.getElementById('qrCode');
var contactIcon = document.querySelector('.contact-logo');
contactIcon.onmouseover = function(ev){
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if(target.nodeName.toLowerCase() == 'img'){
    var iconName = target.className;
    //二维码链接
    var src = 'img/' + iconName + '.jpg'
    qrCode.setAttribute('src',src);
    qrFrame.setAttribute('style','visibility: unset');
  }
  if(target.className == 'contact-logo'){
    hide();
  }
}

contactIcon.onmouseleave = function(){
  hide();
}

function hide(){
  qrFrame.setAttribute('style','visibility: hidden;')
}