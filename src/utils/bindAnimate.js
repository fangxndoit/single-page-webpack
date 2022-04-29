// 获取浏览器可见区域高度
var window_height = document.documentElement.clientHeight;
// 用户手动修改浏览器可见区域高度时修改变量
window.onresize = function () {
  window_height = document.documentElement.clientHeight;
};
// 鼠标滚轮滚动执行方法
window.onscroll = function () {
  // 获取鼠标滚轮滚动距离
  var _scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  // 循环类添加动画
  for (let i = 0; i < list.length; i++) {
    // console.log(list)
    for (let j = 0; j < list[i].length; j++) {
      if (
        _scrollTop >= getOffsetTop(list[i][j]) - window_height &&
        _scrollTop <= getOffsetTop(list[i][j])
      ) {
        list[i][j].classList.add(
          list[i][j].dataset.animate.split(",")[0],
          list[i][j].dataset.animate.split(",")[1]
        );
      }
    }
  }
};

// 判断元素父集是否有已定位元素
function getOffsetTop(ele) {
  var rtn = ele.offsetTop;
  // var o = ele.offsetParent;

  // rtn += o.offsetTop;

  return rtn;
}

var list = [];

// 获取父页面的class集合
export function getClassList(arr) {
  list = arr;
}

// 滚动条等于0时执行第一屏效果
function my_animation() {
  var _scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  // 效果方法
  for (var k = 0; k < My_dream.length; k++) {
    if (
      _scrollTop >= getOffsetTop(My_dream[k]) - window_height &&
      _scrollTop <= getOffsetTop(My_dream[k])
    ) {
      My_dream[k].style.animationName =
        My_dream[k].dataset.animate.split(",")[0];
      My_dream[k].style.animationDuration =
        My_dream[k].dataset.animate.split(",")[1];
      My_dream[k].style.animationTimingFunction =
        My_dream[k].dataset.animate.split(",")[2];
    }
  }
}
