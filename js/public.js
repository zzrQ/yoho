/**
 * Created by Administrator on 2016/10/3.
 */

window.onload = function () {
    Width();
    slide();
};


// ������Ļ���
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

//ʵ�ֶ�̬���ض������ͼ
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


// �ֲ�ͼ
function slide() {
    /**
     * 1.�ֲ�ͼ�����Զ�����
     * 2.�޷��ֲ�ͼ
     * 3.�ֲ�ͼҪ֧�ֻ��� �������һ�  �л�����һ�� ��������Ҫ���� ��һ��
     * 4.������Ҫ��Ԥ����һ�Ż�����һ��
     * 5.�������볬���ֲ�ͼ��1/3��ʱ����л� ��������� ������ȥ
     * 6.�л�ͼƬ��ʱ��СԲ��ҲҪ������
     */
    var slide = document.querySelector('#slide');
    var slideWidth = slide.offsetWidth;
    // ����һ�������ı���Ҳ�����ֲ�ͼ���±꣨������
    var index = 1;
    var slideUl = document.querySelector('#slide ul');
    // �ֲ�ͼ�����Զ�����Ҫ�ж�ʱ��
    var timer;
    var startX = 0;
    var endX = 0;
    var moveX = 0;
    var distanceX = 0; //�����еľ���
    var points = slide.querySelectorAll('ul:last-child li');

    function timerr() {
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-slideWidth * index);
        }, 3000);
    }

    timerr();
    // ���һ����������¼�
    slideUl.addEventListener('transitionend', function () {
        //��������¼�
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
     * 1.��֪�������ľ��� �������ֵ���л��� �л�����һ��
     * 2.����Ǹ�ֵ���л�����һ��
     * 3.���2���¼� touchstart touchend  ��ȡ��ʼ�ͽ�����λ�����
     */
    slide.addEventListener('touchstart', function (e) {
        // ������ʱ��Ͳ�Ҫ�Զ��������ʱ��
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    slide.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        console.log(endX - startX);
        if (endX - startX > 0 && Math.abs(endX - startX) > 1 / 2 * slideWidth) {
            // �л�����һ��
            index--;
        } else if (endX - startX < 0 && Math.abs(endX - startX) > 1 / 2 * slideWidth) {
            // �л�����һ��
            index++;
        }
        addTransition();
        setTranslateX(-slideWidth * index);
        clearInterval(timer);
        timerr();
    });
    //1.��֪������������ �����ľ���
    //2.��ȡ����������� ���õ���ǰ�Ķ�λλ��
    //3. ����һ������λ�ü����������
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