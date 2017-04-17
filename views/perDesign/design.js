/**
 * Created by Administrator on 2017/3/22.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
angular.module("myApp").controller("designCtrl",function($scope,$http,CaseDetailFactory){
    $scope.designInitData = function () {
        var postUrl = "data/design.json";
        CaseDetailFactory.postData(postUrl,function (data){
            $scope.desginData = data;
            console.log("获取数据："+$scope.desginData);
        },function () {
            alert("样本数据加载失败！！！");
        });
    }
});