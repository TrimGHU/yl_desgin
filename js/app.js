/**
 * Created by Administrator on 2017/3/15.
 */
var app = angular.module("myApp",['ionic']);
app.controller("myCtrl",function($scope,$ionicScrollDelegate,$http){
    /*返回顶部*/
    $scope.toTop = function () {
        $ionicScrollDelegate.$getByHandle('myscroll').scrollTop([true]);
        $(".to-top").fadeOut(200);
    }
});
app.directive("to-top", function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            minHeight : '@'
        },
        templateUrl : 'home.html',
        link: function(scope, elem, attrs) {
            elem.click(function() {
                jQuery('html,body').animate({scrollTop:0}, 700);
            })
                .hover(function() {
                    jQuery(this).addClass("hover");
                }, function() {
                    jQuery(this).removeClass("hover");
                });

            scope.minHeight = scope.minHeight ? scope.minHeight : 600;
            jQuery(window).scroll(function() {
                var s = jQuery(window).scrollTop();
                if( s > scope.minHeight) {
                    jQuery(".to-top").fadeIn(100);
                } else {
                    jQuery(".to-top").fadeOut(200);
                };
            });
        }
    };
});
app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home',{//轮播图
        url:'/home',
        templateUrl:'views/home/home.html',
        controller:'homeCtrl'
    /**
    }).state('regist',{//预估报价
        url:'/regist',
        templateUrl:'views/regist/regist.html',
        controller:'registCtrl'
    **/
    }).state('design',{//预估报价
        url:'/design',
        templateUrl:'views/perDesign/design.html',
        controller:'designCtrl'
    }).state('details',{//预估报价
        url:'/details',
        templateUrl:'views/details/details.html',
        controller:'detailsCtrl'
    }).state('charaDesign',{//个性设计
        url:'/charaDesign',
        templateUrl:'views/charaDesign/charaDesign.html',
        controller:'charaDesignCtrl'
    }).state('onlineCalculation',{//个性设计
            url:'/onlineCalculation',
            templateUrl:'views/onlineCalculation/onlineCalculation.html',
            controller:'onlineCalculationCtrl'
        });
    $urlRouterProvider.otherwise('/design');

});

app.factory('CaseDetailFactory',function($http){
    return{
        postData:function(preUrl,successCallBack,errorCallBack){
            $http({
                method:"POST",
                // data:JSON.stringify(params),
                url:preUrl,
                timeout:25000
                //设置为25s后超时
            }).success(function (data,status) {
                successCallBack(data);
            }).error(function (data) {
                errorCallBack(data);
            });
        }
    }
});
