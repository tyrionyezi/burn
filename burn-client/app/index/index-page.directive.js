/**
 * Created by lcx on 2017/4/23.
 */
angular.module('indexBurn')
    .directive('indexPage', function () {
            return {
                restrict: "ACE",
                replace: true,
                templateUrl: 'index/index-page.template.html',
                controller: ['$scope','$http','$state','serverUrl', function ($scope,$http,$state,serverUrl) {
                    var index=1;
                    var inter;
                    $(function () {
                        $scope.loopShow(index);
                    })
                    $scope.loopShow = function(index) {
                        inter=setInterval(function () {

                            if(index>=3){
                                index=1;
                            }else {
                                index++;
                            }
                            // $scope.changeImage(index,0);
                        },2000);
                    }
                    $scope.changeImage = function(i,f) {
                        var advImg=document.querySelector('#advImage');
                        advImg.src='upfile/img0'+i+'.jpg';
                        var imgs=document.querySelectorAll('[id^="img0"]');
                        for(var j=0;j<imgs.length;j++){
                            imgs[j].className='';
                        }
                        imgs[i-1].className='yellowBorder';

                        if(f==1){

                            window.clearInterval(inter);
                            $scope.loopShow(i);
                        }
                    }






                    //获取博客推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getBlogPush',
                    }).then(
                        function (response) {
                            $scope.blogPush=response.data.result;
                        }
                    )

                    //获取视频推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getVideoPush',
                    }).then(
                        function (response) {
                            $scope.videoPush=response.data.result;
                        }
                    )


                    //查看视频详细
                    $scope.watchVideoPush = function (vid, vprice, vname, vtime, vpic) {
                        if (vprice > 0) {
                            $http({
                                method: 'Get',
                                url: serverUrl + 'video/getOrderVideo?vid=' + vid + '',
                                params: {
                                    vid: $scope.vid,
                                    uid: $scope.uid,
                                }
                            }).then(function (response) {
                                $scope.isOrderVideo = response.data.result;
                                if ($scope.isOrderVideo === 1) {
                                    $state.go('video-detail', {vid: vid});
                                } else {
                                    var data = {
                                        vid: vid,
                                        vprice: vprice,
                                        vname: vname,
                                        vtime: vtime,
                                        vpic: vpic,
                                    }
                                    $state.go('video-buy', {data: JSON.stringify(data)});
                                }
                            })

                        } else {
                            $state.go('video-detail', {vid: vid});
                        }
                    }


                    //获取课程推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getCoursePush',
                    }).then(
                        function (response) {
                            $scope.coursePush=response.data.result;
                        }
                    )

                    //获取教练推荐
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getCoachPush',
                    }).then(
                        function (response) {
                            $scope.coachPush=response.data.result;
                        }
                    )

                    //推送博客详情页面
                    $scope.blogPushDetail=function (bid) {
                        $state.go('blog-detail',{bid:bid});
                    }

                }]
            }
        }

    );