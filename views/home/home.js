/**
 * Created by Administrator on 2017/3/15.
 */
angular.module("myApp").controller("homeCtrl",function($scope,CaseDetailFactory,$ionicPopup, $timeout,$ionicScrollDelegate){
    /**
     *  控制li对应的文字显示
     * */
    $scope.contentDate = [true,false,false,false,false];
    $scope.config={enter:false};
    $scope.data = [
        {title:"空间",active:false,text:[
            {name:"客厅",href:""},
            {name:"卧室",href:""},
            {name:"餐厅",href:""},
            {name:"厨房",href:""},
            {name:"卫生间",href:""},
            {name:"阳台",href:""},
            {name:"书房",href:""},
            {name:"玄关",href:""},
            {name:"过道",href:""},
            {name:"儿童房",href:""},
            {name:"衣帽间",href:""},
            {name:"花园",href:""}
        ]},
        {title:"局部",active:false,text:[
            {name:"背景墙",href:""},
            {name:"吊顶",href:""},
            {name:"隔断",href:""},
            {name:"窗帘",href:""},
            {name:"飘窗",href:""},
            {name:"榻榻米",href:""},
            {name:"橱柜",href:""},
            {name:"博古架",href:""},
            {name:"阁楼",href:""},
            {name:"隐形门",href:""},
            {name:"吧台",href:""},
            {name:"酒柜",href:""}
        ]},
        {title:"户型",active:false,text:[
            {name:"小户型",href:""},
            {name:"一居",href:""},
            {name:"二居",href:""},
            {name:"三居",href:""},
            {name:"四居",href:""},
            {name:"复式",href:""},
            {name:"别墅",href:""},
            {name:"公寓",href:""},
            {name:"loft",href:""}
        ]},
        {title:"风格",active:false,text:[
            {name:"简约",href:""},
            {name:"现代",href:""},
            {name:"中式",href:""},
            {name:"欧式",href:""},
            {name:"美式",href:""},
            {name:"田园",href:""},
            {name:"新古典",href:""},
            {name:"不限",href:""},
            {name:"地中海",href:""},
            {name:"东南亚",href:""},
            {name:"日式",href:""},
            {name:"宜家",href:""}
        ]},
        {title:"公装",active:false,text:[
            {name:"美容院",href:""},
            {name:"酒店",href:""},
            {name:"ktv",href:""},
            {name:"酒吧",href:""},
            {name:"美发",href:""},
            {name:"写字楼",href:""},
            {name:"办公室",href:""},
            {name:"宾馆",href:""},
            {name:"会所",href:""},
            {name:"咖啡厅",href:""},
            {name:"商铺",href:""},
            {name:"服装店",href:""}
        ]}
    ];

    $scope.decorateType = function (item) {
        $scope.contentDate = [false,false,false,false,false];
        $scope.contentDate[item] = true;
        console.log($scope.contentDate);
    };
    
    /**
    * 装饰效果图预览
    * */
    $scope.imgPreview = function () {

    };

    $scope.initData = function () {
        var postUrl = "data/yangben.json";
        CaseDetailFactory.postData(postUrl,function (data){
            $scope.sampleData = data;
            //console.log("获取数据："+$scope.sampleData);
        },function () {
            alert("样本数据加载失败！！！");
        });
    };

    /**
    * 初始化 预览区
    * */
    $scope.initPreview = function () {
        var postUrl = "data/preview.json";
        CaseDetailFactory.postData(postUrl,function (data){
            $scope.previewData = data;
            var data1=$scope.previewData.preview1;
            $scope.showPopup = function() {
                //获取到当前的点击的内容下标
                var index = this.$index;
                //这里得到服务器返回的数据data1中下标为data1里面的other数组
                var other=data1[index].other;
                //声明一个空字符串为Img
                var img='';
                //循环other数组
                for(var i=0;i<other.length;i++){
                    //把轮播ion-slide标签添加到img标签中，作为渲染页面时显示的内容，下面的other[i].img是获取other里面的图片路径
                    var divImg='<ion-slide><div class="box"><img src="'+other[i].img+'" height="250" width="100%"></div></ion-slide>';
                    //把制作成功的标签写入空字符串里面
                    img+=divImg
                }
                $scope.imgData = {};
                // 一个精心制作的自定义弹窗
                var myPopup = $ionicPopup.show({
                    //直接调用上面建立好的字符串
                    template: '<ion-slide-box ng-model="data1[index].other" show-pager="false">'+img+'</ion-slide-box>',
                    buttons:[
                        // {text: '取消'},
                        {text: '退出'}
                    ]
                });
            };


        },function () {
            alert("样本数据加载失败！！！");
        });

    };

    /**
    * 监听滚动条
    * */
    // var watch = $scope.$watch("scroll",function(newValue,oldValue, scope){
    //     // console.log(newValue);
    //     // console.log(oldValue);
    //     console.log($(window).scrollTop());
    // });
    $scope.toTop=function () {
        $ionicScrollDelegate.scrollTop(true)
    };


    /**
     * 点击装饰预览区图片，显示相应的图片内容
     * */
    //$scope.showPopup = function() {
    //    $scope.data = {};
    //    // 一个精心制作的自定义弹窗
    //    var myPopup = $ionicPopup.show({
    //
    //        template: '<ion-slide-box class="slide-box" does-continue="true" auto-play="true" slide-interval="3000" show-pager="true" >' +
    //        '<ion-slide ng-repeat="pic in previewData.preview1"><div class="box"><img ng-src="{{pic.src}}" alt="" height="155" width="100%"></div></ion-slide>' +
    //            //'<ion-slide><div class="box"><img src="images/tab2.jpg" alt="" style="height:155px;width:100%;display: inline-block"></div></ion-slide>' +
    //            //'<ion-slide><div class="box"><img src="images/tab3.jpg" alt="" style="height:155px;width:100%;display: inline-block"></div></ion-slide>' +
    //            //'<ion-slide><div class="box"><img src="images/tab4.jpg" alt="" style="height:155px;width:100%;display: inline-block"></div></ion-slide>' +
    //        '</ion-slide-box>',
    //
    //        buttons:
    //            [
    //                {text: '取消'},
    //                {text: '确定'}
    //            ]
    //
    //    });
    //    myPopup.then(function(res) {
    //        console.log('Tapped!', res);
    //    });
    //};
});
