/**
 * Created by Administrator on 2017/3/22.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
angular.module("myApp").controller("detailsCtrl",function($scope,$http,CaseDetailFactory,$location){
    $scope.detailTopSrc = [true,false,false,false];
    var absUrl = $location.absUrl().split("title=")[1];
    console.log("absUrl="+absUrl);
    if(absUrl == '' || absUrl == undefined){
        absUrl = 'super'
    }
    for(var i=0; i<$scope.detailTopSrc.length; i++){
        $scope.detailTopSrc[i] = false;
    }
    switch (absUrl){
        case "super":
            $scope.detailTopSrc[0] = true;
            break;
        case "delicate":
            $scope.detailTopSrc[1] = true;
            break;
        case "light":
            $scope.detailTopSrc[2] = true;
            break;
        case "luxury":
            $scope.detailTopSrc[3] = true;
            break;
    }
    $scope.detailsInitData = function () {
        var postUrl = "data/details.json";
        CaseDetailFactory.postData(postUrl,function (data){
            absUrl = "data."+absUrl;
            $scope.detailsData = eval(absUrl);
        },function () {
            alert("样本数据加载失败！！！");
        });
    }
});