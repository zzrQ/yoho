/**
 * Created by Administrator on 2016/10/12.
 */
(function(angular){
    "use strict";
    angular.module("CartApp",[])
        .controller("MainCtrl",["$scope", function ($scope) {
            $scope.goods = [
                {imgSrc:"img/goods/shirt1.jpg",description:"趣味图案印花卫衣",now:208.00,before:2080.00 },
                {imgSrc:"img/goods/shoes1.jpg",description:"意大利原产羊皮休闲鞋",now:600.00,before:1918.00 },
                {imgSrc:"img/goods/shirt2.jpg",description:"简洁白色卫衣百搭",now:299.00,before:388.00 },
                {imgSrc:"img/goods/shoes2.jpg",description:"男士蓝色豆豆鞋羊皮",now:99.00,before:198.00 },
                {imgSrc:"img/goods/shirt3.jpg",description:"黑色男士绅士卫衣",now:120.00},
                {imgSrc:"img/goods/shoes3.jpg",description:"棕色高帮系带",now:460.00},
                {imgSrc:"img/goods/shirt4.jpg",description:"炫彩手指图案潮流卫衣",now:99.00},
                {imgSrc:"img/goods/shoes4.jpg",description:"意大利原产男款低帮休闲板鞋",now:208.00}

            ];
            $scope.goods.forEach(function (ele) {
                if(ele.before){
                    ele.discount = ele.now/ele.before;
                }else{
                    ele.discount = 1;
                }
            });

            $scope.current ="default";


            $scope.search= {
                description: ''
            };


            $scope.count = 0;
            $scope.count1 = 0;
            $scope.sortPrice = function () {
                $scope.current ='price'
                $scope.count++;

                $scope.goods.sort(function (a, b) {
                    if (a.now > b.now) {
                        return 1;
                    } else if (a.now < b.now) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                if($scope.count%2==0){
                    $scope.goods.reverse();

                }
            }

            $scope.sortDiscount= function () {
                $scope.current ='discount'
                $scope.count1++;
                    $scope.goods.sort(function (a, b) {
                        if (a.discount > b.discount) {
                            return 1;
                        } else if (a.discount < b.discount) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                if($scope.count1%2==0){
                    $scope.goods.reverse();

                }
            }

        }]);


})(angular);


