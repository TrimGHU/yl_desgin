/**
 * Created by on 2017/4/8.
 */
/**
 * Created by Administrator on 2017/3/22.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
var num = 0;
angular.module("myApp").controller("onlineCalculationCtrl",function($scope,$http,CaseDetailFactory,$location){
    $scope.CalculationT = [true,false,false,false,false,false,false];
    $scope.CalculationW = [true,false,false,false,false,false,false];
    $scope.CalculationD = [true,false,false,false,false,false,false];
    $scope.CalculationL = [true,false,false,false,false,false,false];
    $scope.activeLiT = [true,false,false];
    $scope.activeLiTImg = [true,false,false,false,false];
    $scope.SwitchContentT = [true,false,false,false,false,false,false,false];
    $scope.SwitchBackgroundT = [true,false,false,false,false,false,false,false];
    $scope.activeTab = 0;
    $scope.activeWei = 0;
    $scope.activeDeng = 0;
    $scope.activeLong = 0;
    $scope.activeLi = 0;
    $scope.activeTabImg = 0;
    $scope.activeDisableTab = 0;
    $scope.CalculationBtn = function (param) {
        for(var i=0;i<$scope.CalculationT.length;i++){
            $scope.CalculationT[i] = false;
        }
        $scope.CalculationT[param] = true;
        $scope.activeTab = param;
    }
    $scope.CalculationWei = function (param) {
        for(var i=0;i<$scope.CalculationT.length;i++){
            $scope.CalculationW[i] = false;
        }
        $scope.CalculationW[param] = true;
        $scope.activeWei = param;
    }
    $scope.CalculationDeng = function (param) {
        for(var i=0;i<$scope.CalculationT.length;i++){
            $scope.CalculationD[i] = false;
        }
        $scope.CalculationD[param] = true;
        $scope.activeDeng = param;
    }
    $scope.CalculationLong = function (param) {
        for(var i=0;i<$scope.CalculationL.length;i++){
            $scope.CalculationL[i] = false;
        }
        $scope.CalculationL[param] = true;
        $scope.activeLong = param;
    }
    $scope.activeLiBtn = function (param) {
        for(var i=0;i<$scope.activeLiTImg.length;i++){
            $scope.activeLiTImg[i] = false;
        }
        $scope.activeLiTImg[0] = true;

        for(var i=0;i<$scope.activeLiT.length;i++){
            $scope.activeLiT[i] = false;
        }
        $scope.activeLiT[param] = true;
        $scope.activeLi = param;
        $scope.activeTabImg = 0;
    }
    $scope.CalculationBtnCi = function (param) {
        for(var i=0;i<$scope.activeLiTImg.length;i++){
            $scope.activeLiTImg[i] = false;
        }
        $scope.activeLiTImg[param] = true;
        $scope.activeTabImg = param;
    }

    $scope.initonLineData = function () {
        var postUrl = "data/onlineCal.json";
        CaseDetailFactory.postData(postUrl,function (data){
            $scope.sampleData = data;
            //console.log("获取数据："+$scope.sampleData);
        },function () {
            alert("样本数据加载失败！！！");
        });
    };
    
    $scope.onlineCalLeft = function () {
        var width = screen.width * 0.8/4;
        num --;
        console.log("onlineCalLeft num="+num);
        if(num == 0){
            $scope.activeDisableTab = 0;
        }else if(num < 0){
            num = 0;
            return;
        }else{
            $scope.activeDisableTab = 10;
        }
        width = -width*(num);
        console.log("手机屏幕宽度="+width);
        $scope.imgObj = {
            "top":0 + "px",
            "left": width+ "px"
        }
    }
    $scope.onlineCalRight = function () {
        var width = screen.width * 0.8/4;
        num ++;
        console.log("num="+num);
        if(num == 2){
            $scope.activeDisableTab = 100;
        }else if(num >2){
            num = 2;
            return;
        }else {
            $scope.activeDisableTab = 10;
        }
        width = -width*(num);
        console.log("手机屏幕宽度="+width);
        $scope.imgObj = {
            "top":0 + "px",
            "left": width+ "px"
        }
    }
    $scope.SwitchContentBtn = function (param) {
        for(var i=0; i<$scope.SwitchContentT.length; i++){
            $scope.SwitchContentT[i] = false;
        }
        $scope.SwitchContentT[param] = true;
        for(var i=0; i<$scope.SwitchBackgroundT.length; i++){
            $scope.SwitchBackgroundT[i] = false;
        }
        $scope.SwitchBackgroundT[param] = true;
    }
});