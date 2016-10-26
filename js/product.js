/**
 * Created by Administrator on 2016/10/17.
 */

var addCart = document.querySelector("#addShoppingCart .add-cart");

var select = document.querySelector("#select");

var body = document.querySelector("body");

var liArr = document.querySelectorAll(".chose-items li");

var data ={};

var span = document.querySelector("#addShoppingCart>span");

addCart.addEventListener("click", function () {
    select.classList.add("show");
    body.classList.add("hidden");
});

liArr[0].addEventListener("click", function () {

    this.classList.toggle("pitch-on");
    data.color = this.innerHTML;

});

for (var i = 1, len = liArr.length; i < len; i++) {

    liArr[i].addEventListener("click", function () {

        for (var j = 1, len = liArr.length; j < len; j++) {
            if (liArr[j].classList.contains("pitch-on")) {
                liArr[j].classList.remove("pitch-on");
            }
        }
        this.classList.toggle("pitch-on");
        var pitchOn = document.querySelector(".size-list>.pitch-on");
        data.size = pitchOn.innerHTML;
    });
}

var numDiv = document.querySelector(".num>div");
var btnArr = numDiv.children;

data.num = btnArr[1].value - 0;

btnArr[0].onclick = function () {
    data.num = btnArr[1].value;
    data.num--;
    if (data.num < 1) {
        data.num = 1;
    }
    btnArr[1].value = data.num;
}
btnArr[2].onclick = function () {
    data.num = btnArr[1].value;
    data.num++;
    btnArr[1].value = data.num;
}

var btnCart = document.querySelector(".btn-wrap>button");

btnCart.addEventListener("click", function () {
    if(!data.color) {
        return alert("Please choose one color");
    }
    if(!data.size) {
        return alert("Please choose one size");
    }
    span.innerHTML = data.num;
    select.classList.remove("show");
    body.classList.remove("hidden");
    return alert("commit data sucess");

});


