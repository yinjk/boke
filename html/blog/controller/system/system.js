blog.controller('systemController', function($rootScope, $scope, $http) {
    $scope.sysTime = "";
    $scope.sysInfo = {};
    $http.get($rootScope.baseUrl + "/api/1/system/time").success(function (response) {
        if(response.status == 0)
        $scope.sysTime = response.data;
    });
    $http.get($rootScope.baseUrl + "/api/1/system/info").success(function (response) {
        if(response.status == 0){
            $scope.sysInfo = response.data;
            $scope.sysInfo.browser = currBrowser();
        }
    });
    $http.get($rootScope.baseUrl + "/api/1/user/login/status").success(function (response) {
        if(response.status == 0){
            $scope.loginStatus = response.data;
        }
    });
    $http.post($rootScope.baseUrl + "/api/1/manage/article/statistics").success(function (response) {
        if(response.status == 0){
            $scope.statistics = response.data;
            $('#as').attr("data-value", "100");
            console.log($scope.statistics);
        }
    });

   /* $http({
        method:"GET",
        url:"http://localhost:8080/boke-core/api/1/system/time",
        headers: {'authorization': token}
    }).success(function (response) {
        if(response.status == 0)
            $scope.sysTime = response.data;
    });
    $http({
        method:"GET",
        url:"http://localhost:8080/boke-core/api/1/system/info",
        headers: {'authorization': token}
    }).success(function (response) {
        if(response.status == 0){
            $scope.sysInfo = response.data;
            $scope.sysInfo.browser = currBrowser();
        }
    });*/
    var loadTime = chrome.loadTimes();
    $scope.loadTime = loadTime.commitLoadTime - loadTime.startLoadTime;



    /**
     * 获取浏览器版本
     * @returns {string}
     */
    function currBrowser() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        window.ActiveXObject ? Sys.ie = ua.match(/msie ([\d.]+)/)[1] :
            document.getBoxObjectFor ? Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1] :
                window.MessageEvent && !document.getBoxObjectFor ? Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1] :
                    window.opera ? Sys.opera = ua.match(/opera.([\d.]+)/)[1] :
                        window.openDatabase ? Sys.safari = ua.match(/version\/([\d.]+)/)[1] : 0;
        var browser = "";
        if(Sys.ie) browser = 'IE: '+Sys.ie;
        if(Sys.firefox) browser = 'Firefox: '+Sys.firefox;
        if(Sys.chrome)  browser = 'Chrome: '+Sys.chrome;
        if(Sys.opera)   browser = 'Opera: '+Sys.opera;
        if(Sys.safari)  browser = 'Safari: '+Sys.safari;
        return browser;
    }




















});