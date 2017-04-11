/**
 * Created by Administrator on 2017/3/22.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
angular.module("myApp").controller("detailsCtrl",function($scope,$http,CaseDetailFactory,$location){
    var absUrl = $location.absUrl().split("title=")[1];
    console.log(absUrl);
    if(absUrl == '' || absUrl == undefined){
        absUrl = 'super'
    }
    $scope.detailsInitData = function () {
        var postUrl = "data/details.json";
        CaseDetailFactory.postData(postUrl,function (data){
            absUrl = "data."+absUrl;
            $scope.detailsData = eval(absUrl);
            // $scope.detailsData = data.delicate;
            console.log("获取数据:"+$scope.detailsData);
        },function () {
            alert("样本数据加载失败！！！");
        });
    }
});