/**
 * Created by Administrator on 2016/10/3.
 */

window.onload = function () {
    Width();
    slide();
};


// 适配屏幕宽度
var html = document.querySelector("html");

window.onresize = Width;

function Width() {
    var wid = window.innerWidth;
    if (wid >= 640) {
        html.style.fontSize = 40 + "px";
    } else if (wid <= 64) {
        html.style.fontSize = 4 + "px";
    } else {
        html.style.fontSize = wid / 16 + "px";
    }
}

//实现动态加载多个背景图
var bar = document.querySelector('.fa-bars');
var sideNav = document.querySelector('.side-nav');
var overlay = document.querySelector('.overlay');
var yohoPage = document.querySelector('.yoho-page');
var spanImages = sideNav.querySelectorAll('.nav-img');
var titles = sideNav.querySelectorAll('.title');


for (var i = 0, len = spanImages.length; i < len; i++) {
    spanImages[i].style.backgroundImage = 'url(img/side-nav/' + titles[i].innerHTML + '.png)';
}

bar.onclick = function () {
    yohoPage.classList.add('menu-open');
    overlay.style.display = "block";
    sideNav.classList.add('on');
}
overlay.onclick = function () {
    overlay.style.display = "none";
    sideNav.classList.remove('on');
    yohoPage.classList.remove('menu-open');
}


// 轮播图
function slide() {
    /**
     * 1.轮播图可以自动播放
     * 2.无缝轮播图
     * 3.轮播图要支持滑动 从左往右滑  切换到上一张 从右往左滑要换到 下一张
     * 4.滑动中要能预览上一张或者下一张
     * 5.滑动距离超过轮播图的1/3的时候才切换 如果不超过 吸附回去
     * 6.切换图片的时候小圆点也要跟着走
     */
    var slide = document.querySelector('#slide');
    var slideWidth = slide.offsetWidth;
    // 定义一个计数的变量也就是轮播图的下标（索引）
    var index = 1;
    var slideUl = document.querySelector('#slide ul');
    // 轮播图可以自动播放要有定时器
    var timer;
    var startX = 0;
    var endX = 0;
    var moveX = 0;
    var distanceX = 0; //滑动中的距离
    var points = slide.querySelectorAll('ul:last-child li');

    function timerr() {
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-slideWidth * index);
        }, 3000);
    }

    timerr();
    // 添加一个过渡完成事件
    slideUl.addEventListener('transitionend', function () {
        //过渡完成事件
        if (index >= 9) {
            index = 1;
            removeTransition()
            setTranslateX(-slideWidth * index);
        } else if (index <= 0) {
            index = 8;
            removeTransition()
            setTranslateX(-slideWidth * index);
        }
        setPoints();
        // console.log(slideUl.style.transform);
    });
    /**
     * 1.得知道滑动的距离 如果是正值就切换到 切换到上一张
     * 2.如果是负值就切换到下一张
     * 3.添加2个事件 touchstart touchend  获取开始和结束的位置相减
     */
    slide.addEventListener('touchstart', function (e) {
        // 滑动的时候就不要自动播清除定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    slide.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        console.log(endX - startX);
        if (endX - startX > 0 && Math.abs(endX - startX) > 1 / 2 * slideWidth) {
            // 切换到上一张
            index--;
        } else if (endX - startX < 0 && Math.abs(endX - startX) > 1 / 2 * slideWidth) {
            // 切换到下一张
            index++;
        }
        addTransition();
        setTranslateX(-slideWidth * index);
        clearInterval(timer);
        timerr();
    });
    //1.得知道滑动过程中 滑动的距离
    //2.获取到了这个距离 设置到当前的定位位置
    //3. 从上一次最后的位置加上这个距离
    slide.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-slideWidth * index + distanceX);
    });


    function setPoints() {
        for (var i = 0; i < points.length; i++) {
            points[i].className = "";
        }
        points[index - 1].className = "active";
    }

    function setTranslateX(x) {
        slideUl.style.transform = "translateX(" + x + "px)";
    }

    function removeTransition() {
        slideUl.style.transition = "none";
    }

    function addTransition() {
        slideUl.style.transition = "all 0.2s";
    }
}