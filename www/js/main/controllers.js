var app = angular.module("YourApp", ["ionic", "ngSanitize", "ngCordova"]);
app.run(["$ionicPlatform", function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        window.cordova && window.cordova.plugins.Keyboard && cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0), window.StatusBar && StatusBar.styleDefault()
    })
}]), app.run(["$rootScope", function () {
    document.addEventListener("deviceready", function () { })
}]), app.config(["$ionicConfigProvider", function ($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text("").icon("ion-ios-arrow-back").previousTitleText(!1)
}]), app.controller("MainCtrl", ["$scope", "$ionicSideMenuDelegate", "$ionicHistory", "$ionicLoading", function () { }]), app.controller("GalleryCtrl", ["$scope", "Photos", "$ionicModal", "$ionicSideMenuDelegate", "$cordovaFileTransfer", "$ionicLoading", function ($scope, Photos, $ionicModal, $ionicSideMenuDelegate, $cordovaFileTransfer, $ionicLoading) {
    $ionicSideMenuDelegate.canDragContent(!1), $scope.items = [], $scope.times = 0, $scope.postsCompleted = !1, $scope.getPosts = function () {
        Photos.getPosts().success(function (posts) {
            sessionStorage.posts = JSON.stringify(posts);
            var postsData = posts.sort(function (a, b) {
                return a.Variable1 < b.Variable1 ? 1 : -1
            }).slice(0, 10);
            $scope.items = postsData, $scope.times = 10, $scope.$broadcast("scroll.infiniteScrollComplete")
        }).error(function () {
            $scope.items = []
        })
    }, $scope.loadMore = function () {
        var postsData = JSON.parse(sessionStorage.posts),
            topPostsData = postsData.sort(function (a, b) {
                return a.Variable1 < b.Variable1 ? 1 : -1
            }).slice(0, $scope.times + 10);
        $scope.items = topPostsData, $scope.times = $scope.times + 10, $scope.$broadcast("scroll.infiniteScrollComplete"), $scope.times >= postsData.length && ($scope.postsCompleted = !0)
    }, $scope.doRefresh = function () {
        $scope.times = 0, $scope.items = [], $scope.postsCompleted = !1, $scope.getPosts(), $scope.$broadcast("scroll.refreshComplete")
    }, $scope.getPosts(), $ionicModal.fromTemplateUrl("templates/image-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function (modal) {
        $scope.modal = modal
    }), $scope.openModal = function () {
        $scope.showNav = !0, $scope.modal.show()
    }, $scope.closeModal = function () {
        $scope.showNav = !1, $scope.modal.hide()
    }, $scope.showImage = function (index) {
        $scope.imageIndex = index, $scope.imageSrc = $scope.items[index].image_full, $scope.openModal()
    };
    var targetPath;
    $scope.SaveImage = function (url) {
        function gotFS(fileSystem) {
            fileSystem.root.getDirectory("ChouTzuYu Wallpapers", {
                create: !0
            })
        }

        function fail() { }
        try {
            $ionicLoading.show({
                template: "<div class='loading-text'><div class='row'> <div class='col col-10 loading-thumb-container'><img class='rec-loading-thumb' src='img/loading.gif' /></div> <div class='col col-90'><h4 class='black-text'>Downloading..</h4></div> </div></div>",
                animation: "fade-in",
                showBackdrop: !1,
                showDelay: 500
            }), Date.prototype.today = function () {
                return (this.getDate() < 10 ? "0" : "") + this.getDate() + "/" + (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear()
            }, Date.prototype.timeNow = function () {
                return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes() + ":" + (this.getSeconds() < 10 ? "0" : "") + this.getSeconds()
            }, window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail), targetPath = cordova.file.externalRootDirectory + "/ChouTzuYu Wallpapers/" + (new Date).today() + " @ " + (new Date).timeNow() + ".jpg", options = {}, trustHosts = !0, $cordovaFileTransfer.download(cordova.file.dataDirectory + url, targetPath, options, trustHosts).then(function () {
                $ionicLoading.hide(), alert("Image Successfully Saved To Gallery"), AdMob.prepareInterstitial({
                    adId: "ca-app-pub-5938055547979263/2242615578",
                    autoShow: !0
                }), refreshMedia.refresh(targetPath)
            }, function () {
                $ionicLoading.hide(), navigator.showToast("Feature Comming Soon..");

                AdMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: false
                });
            }, function () { })
        } catch (e) {
            $ionicLoading.hide()
        }
    }, $scope.downloadImage = function (url) {
        function checkPermissionMicCallback(status) {
            if (status.hasPermission) $scope.SaveImage(url);
            else {
                var errorCallback = function () {
                    alert("File Storage Permission Is Not Turned On")
                };
                permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, function (status) {
                    status.hasPermission ? $scope.SaveImage() : errorCallback()
                }, errorCallback)
            }
        }

        function checkFilePermission() {
            permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionMicCallback, null)
        }
        try {
            var permissions = cordova.plugins.permissions;
            checkFilePermission()
        } catch (e) {
            alert(e.message)
        }
    }, $scope.SetWallpaper = function (url) {
        window.plugins.wallpaper.setImageHttp(url), navigator.showToast("Setting As Background Wallpaper.."), AdMob.prepareInterstitial({
            adId: "ca-app-pub-5938055547979263/2242615578",
            autoShow: !0
        })
    }, $scope.ShareWallpaper = function (url) {
        function checkPermissionMicCallback(status) {
            function gotFS(fileSystem) {
                fileSystem.root.getDirectory("Chou Tzu-Yu Wallpapers", {
                    create: !0
                })
            }

            function fail() { }
            if (status.hasPermission) $ionicLoading.show({
                template: "<div class='loading-text'><div class='row'> <div class='col col-10 loading-thumb-container'><img class='rec-loading-thumb' src='img/loading.gif' /></div> <div class='col col-90'><h4 class='black-text'>Sharing..</h4></div> </div></div>",
                animation: "fade-in",
                showBackdrop: !1,
                showDelay: 500
            }), Date.prototype.today = function () {
                return (this.getDate() < 10 ? "0" : "") + this.getDate() + "/" + (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear()
            }, Date.prototype.timeNow = function () {
                return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes() + ":" + (this.getSeconds() < 10 ? "0" : "") + this.getSeconds()
            }, window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail), targetPath = cordova.file.externalRootDirectory + "/Chou Tzu-Yu Wallpapers/" + (new Date).today() + " @ " + (new Date).timeNow() + ".jpg", options = {}, trustHosts = !0, $cordovaFileTransfer.download(cordova.file.dataDirectory + "/" + url, targetPath, options, trustHosts).then(function () {
                $ionicLoading.hide(), window.plugins.socialsharing.share("Download This Awsome Chou Tzu-Yu Wallpaper App. https://play.google.com/store/apps/details?id=com.ChouTzuYuWallpapers", null, targetPath), refreshMedia.refresh(targetPath)
            }, function () {
                $ionicLoading.hide(), navigator.showToast("Feature Comming Soon..");
                AdMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: false
                });
            }, function () { });
            else {
                var errorCallback = function () {
                    alert("File Storage Permission Is Not Turned On")
                };
                permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, function (status) {
                    status.hasPermission || errorCallback()
                }, errorCallback)
            }
        }
        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionMicCallback, null)
    }, $scope.imageNavigate = function (dir) {
        $scope.imageIndex = "right" == dir ? $scope.imageIndex + 1 : $scope.imageIndex - 1, void 0 === $scope.items[$scope.imageIndex] ? $scope.closeModal() : $scope.imageSrc = $scope.items[$scope.imageIndex].image_full
    }, $scope.$on("$stateChangeStart", function () {
        $scope.modal.remove()
    })
}]);