var container = document.getElementById('container');
var lastBox; //用于存放上一次变化的box，使鼠标移出container或者移入box之间的空白处时，将图片还原，文字隐藏




/*************图片滑过开始***************/
//事件代理，只用给container添加一个监听器就可以监听三个box
container.onmouseover = function (ev) {
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if (target.className == 'box') {
    if (lastBox) { //确保只有一个显示
      leave(lastBox);
    }
    lastBox = target;
    show(target);
  }
  //鼠标在box之间的空白处且lastBox被赋值
  if (target.id == 'container' && lastBox) {
    leave(lastBox);
  }
}

//鼠标移出container且lsatBox被赋值
container.onmouseleave = function () {
  if (lastBox) {
    leave(lastBox);
  }
}

//设置图片不透明度为0，文字不透明度为1
function show(box) {
  var pre = box.querySelector('.pre');
  var img = box.querySelector('img');
  img.setAttribute('style', 'opacity: 0;');
  pre.setAttribute('style', 'opacity: 1;');
}

//恢复图片不透明度为1，文字不透明度为0
function leave(box) {
  var pre = box.querySelector('.pre');
  var img = box.querySelector('img');
  img.setAttribute('style', 'opacity: 1;');
  pre.setAttribute('style', 'opacity: 0;');
}
/*********图片滑过结束***********/




/*************二维码开始**************/
//和上面一样的操作
var qrFrame = document.getElementById('qrFrame');
var qrCode = document.getElementById('qrCode');
var contactIcon = document.querySelector('.contact-logo');
contactIcon.onmouseover = function (ev) {
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if (target.nodeName.toLowerCase() == 'img') {
    var iconName = target.className;
    //二维码链接
    var src = 'img/' + iconName + '.jpg'
    qrCode.setAttribute('src', src);
    qrFrame.setAttribute('style', 'visibility: unset');
  }
  if (target.className == 'contact-logo') {
    hide();
  }
}

contactIcon.onmouseleave = function () {
  hide();
}

function hide() {
  qrFrame.setAttribute('style', 'visibility: hidden;')
}
/*************二维码结束******************/



/************移动端滑动开始*****************/
var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var box3 = document.getElementById('box3');

var box1Position = box1.getBoundingClientRect().y;//用于判断滚动是否结束
var height = box1.offsetHeight; //获取每一个box的高度
var windowHeight = window.innerHeight; //获取屏幕高度

//初始化
if (screen.width < 1000) {
  show(box1);
  scroll(box2);
  scroll(box3);
}

//屏幕滑动的监控
window.ontouchmove = function () {
  if (screen.width < 1000) {
    scroll(box1);
    scroll(box2);
    scroll(box3);
    box1Position = box1.getBoundingClientRect().y;
    isStop();//判断滚动是否停止
  }
}

//用于判断滚动是否结束，因为对ontouchmove的监控会在手指滑动之后，离开屏幕的时候失效，此时如果屏幕继续下滑，那么不透明度还是会停留在离开时候的样子。这里设置一个50ms的timeout，检测box1的y轴前后是否一样，如果不一样则表明屏幕还在滚动
function isStop() {
  setTimeout(function () {
    if (box1.getBoundingClientRect().y != box1Position) {
      scroll(box1);
      scroll(box2);
      scroll(box3);
      box1Position = box1.getBoundingClientRect().y;
      isStop();
    }
  },50)
}

//滑动的函数,通过box在屏幕内的比例来控制文字和图片的不透明度
function scroll(box) {
  //获取box在屏幕的y轴，即据屏幕顶部的距离
  var y = box.getBoundingClientRect().y;
  //整个box都在屏幕内的判断
  if (y > 0 && y + height < windowHeight) {
    show(box);
  } else if ((y > 0 && y + height > windowHeight && y < windowHeight) || (y < 0 && y + height > 0)) { //只有box的上部或者下部在屏幕内
    var pre = box.querySelector('.pre');
    var img = box.querySelector('img');
    if (y > 0 && y + height > windowHeight) { //只有box上部在屏幕内
      //inScreen为在box在屏幕内的大小的百分比,将这个值赋给不透明度
      var inScreen = (windowHeight - y) / height;
      //因为setAttribute的第二个参数既有字符串又有变量，所以第二个参数加了个括号
      pre.setAttribute('style', ('opacity: ' + inScreen));
      img.setAttribute('style', ('opacity: ' + (1 - inScreen)));
    } else if (y < 0 && y + height > 0) { //只有box下部在屏幕内
      //box在屏幕内的比例本来是(y + height)/height; 不用 *0.5，但是因为box下面的标题有很大一块空白，所以为了变化的效果更好，所以修改了一下
      var inScreen = (y + 0.5 * height) / (0.5 * height);
      pre.setAttribute('style', ('opacity: ' + inScreen));
      img.setAttribute('style', ('opacity: ' + (1 - inScreen)));
    }
  }
}
/***********移动端滑动结束****************/