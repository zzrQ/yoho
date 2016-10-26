/**
 * Created by Administrator on 2016/10/19.
 */

'use strict';

function deleteProduct() {
    /**
     * 1.点击垃圾篓给弹出框添加动画类名
     * 2.点击垃圾篓要给每一个垃圾篓都添加单击事件
     */
    var deleteBox = document.querySelectorAll('.delete-box');
    var del;
    for (var i = 0; i < deleteBox.length; i++) {
        deleteBox[i].addEventListener('click', function () {
            del = this.parentNode;
            //给弹出框添加类名
            //首先得让弹出框显示出来
            popup(del);


        });
    }
}
function popup(obj) {
    var model = document.querySelector('#model');
    var btnCancel = document.querySelector('.btn-cancel');
    var btnConfirm = document.querySelector('.btn-confirm');

    model.style.display = "block";
    model.querySelector('.model-info').classList.add('bounceInDown');

    btnCancel.addEventListener('click', function () {
        // 隐藏模态框
        model.style.display = "none";
    });

    btnConfirm.addEventListener('click', function () {

        obj.parentNode.removeChild(obj);

        // 隐藏模态框
        model.style.display = "none";
    })
}
window.onload = function () {

    var products = document.querySelectorAll(".goods-list>.product");
    var selectedTotal = document.querySelector("#selectedTotal");
    var priceTotal = document.querySelector("#priceTotal");
    var selectInputs = document.querySelectorAll("input[type='checkbox']");
    var checkAll = document.querySelector(".check-all");
    var deleteAll = document.querySelector(".delete-all");
    var arr;
    deleteProduct();
// 更新总数和总价格
    function getTotal() {
        var seleted = 0;
        var price = 0;
        var subtotal = 0;
        for (var i = 0, len = products.length; i < len; i++) {
            if (products[i].getElementsByTagName('input')[0].checked) {
                var count = parseInt(products[i].getElementsByTagName('input')[1].value);
                seleted += count;
                subtotal = parseFloat(products[i].querySelector(".product-price>span").innerHTML) * count;
                price += subtotal;
            }
        }
        selectedTotal.innerHTML = seleted;
        priceTotal.innerHTML = price.toFixed(2);

    }

// 点击选择框
    for (var i = 0; i < selectInputs.length; i++) {
        selectInputs[i].onclick = function () {
            var flag = true;
            if (this.className.indexOf('check-all') >= 0) {
                //如果是全选按钮，则把所有的选择框选中
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;
                }
            }
            else {
                for (var j = 0; j < selectInputs.length - 1; j++) {
                    if (selectInputs[j].checked == false) {
                        //只要有一个未勾选，则取消全选框的选中状态
                        flag = false;
                    }
                    checkAll.checked = flag;
                }
            }

            getTotal();//选完更新总计
        }
    }


//为每行元素添加事件
    for (var i = 0; i < products.length; i++) {
        //将点击事件绑定到product元素

        products[i].querySelector('.substract').onclick = function () {
            var value = parseInt(this.parentNode.querySelector('input').value);
            if (value > 1) {
                this.parentNode.querySelector('input').value = value - 1;
            }
            getTotal();
        }
        products[i].querySelector('.add').onclick = function () {
            var value = parseInt(this.parentNode.querySelector('input').value);
            this.parentNode.querySelector('input').value = value + 1;

            getTotal();
        }
        // 给数目输入框绑定keyup事件
        products[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
            getTotal(); //更新总数
        }
    }


}

