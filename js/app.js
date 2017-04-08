/*-------------------------------------------------------
 very.gd angularjs app controller
-------------------------------------------------------*/

// app globals
var appRoot = '/';
var apiUrl = "http://api.very.gd/";

// very.gd projects object
var projects = [];

// initialize angularjs app
var app = angular.module('vgdApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : appRoot+'pages/features.html',
        controller  : 'HomeController'
    })
    .when('/gallery', {
        templateUrl : appRoot+'pages/gallery.html',
        controller  : 'GalleryController'
    })
    .when('/user/:id', {
        templateUrl : appRoot+'pages/user.html',
        controller  : 'UserController',
    })
    .when('/public-gallery', {
        templateUrl : appRoot+'pages/public-gallery.html',
        controller  : 'PublicGalleryController'
    })
    .when('/project/:id', {
        templateUrl : appRoot+'pages/project.html',
        controller  : 'ProjectController'
    })
    .when('/pricing', {
        templateUrl : appRoot+'pages/pricing.html',
        controller  : 'PricingController'
    })
    .when('/privacy', {
        templateUrl : appRoot+'pages/privacy.html',
        controller  : 'StaticPageController'
    })
    .when('/terms', {
        templateUrl : appRoot+'pages/terms.html',
        controller  : 'StaticPageController'
    })
    .otherwise({redirectTo: '/'});
});
app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
app.controller('HomeController', function($scope) {
    $('body').removeClass().addClass('bg-dark');
    window.document.title = "very.gd - Quickly publish, prototype, and storyboard for VR and 360° video.";
});
app.controller('GalleryController', function($scope, $http, $filter) {
    $scope.message = 'The possibilies are endless. Here are a few of our favorite examples.';
    $('body').removeClass().addClass('gradient');   
    $scope.quantity = 5;
    if (projects.length){
        $scope.projects = projects;
        $scope.featuredProjects = $filter('filter')($scope.projects, { featured: true });
        $('.loader').hide();
    } else {
        $http.get(apiUrl + 'public/project', {cache: true}).
        success(function(data, status, headers, config) {
            $scope.projects = data;
            //$scope.featuredProjects = data;
            $scope.featuredProjects = $filter('filter')($scope.projects, { featured: true });
            projects = data;
        }).
        error(function(data, status, headers, config) {
            console.log(status);
        })['finally'](function() {
            $('.loader').hide();
        });
    }
    window.document.title = "very.gd - Featured Gallery.";
});
app.controller('PublicGalleryController', function($scope, $http) {
    $('body').removeClass().addClass('static');
    //$scope.quantity = 15;
    if (projects.length){
        $scope.projects = projects;
        $('.loader').hide();
    } else {
        $http.get(apiUrl + 'public/project', {cache: true}).
        success(function(data, status, headers, config) {
            $scope.projects = data;
            projects = data;
        }).
        error(function(data, status, headers, config) {
            console.log(status);
        })['finally'](function() {
            $('.loader').hide();
        });
    }
    window.document.title = "very.gd - Public Gallery";
});
app.controller('UserController', function($scope, $http, $route, $filter){
    $('body').removeClass().addClass('static');
    $scope.showUserId = $route.current.params.id;
    $scope.title = $route.current.params.id;
    if (projects.length){
        $scope.projects = projects;
    } else {
        $http.get(apiUrl + 'public/project', {cache: true}).
        success(function(data, status, headers, config) {
            $scope.projects = data;
            projects = data;
        });
    }
    window.document.title = "very.gd - User Profile";
});
app.controller('ProjectController', function($scope, $http, $route, $filter) {
    $('body').removeClass().addClass('static');
    $scope.showProjectId = $route.current.params.id;
    var pid = $route.current.params.id;
    if (projects.length){
        $scope.projects = projects;
        $scope.currentProject = $filter('filter')($scope.projects, {id: $scope.showProjectId })[0];
        $scope.tab = $scope.currentProject.content[0].id;
        if ($scope.currentProject.content.length === 1){
            $scope.numScenes = $scope.currentProject.content.length + " Scene";
        } else {
            $scope.numScenes = $scope.currentProject.content.length + " Scenes";
        }
        window.document.title = "very.gd - " + $scope.currentProject.name;
    } else {
        $http.get(apiUrl + 'public/project', {cache: true}).
        success(function(data, status, headers, config) {
            $scope.projects = data;
            projects = data;
            $scope.currentProject = $filter('filter')($scope.projects, {id: $scope.showProjectId })[0];
            $scope.tab = $scope.currentProject.content[0].id;
            if ($scope.currentProject.content.length === 1){
                $scope.numScenes = $scope.currentProject.content.length + " Scene";
            } else {
                $scope.numScenes = $scope.currentProject.content.length + " Scenes";
            }
            window.document.title = "very.gd - " + $scope.currentProject.name;
        });
    }
    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
    };
});
app.controller('PricingController', function($scope) {
    $('body').removeClass().addClass('gradient'); 
    $scope.currentPlan = 'beta_yearly';
    $scope.selectedPlan = $scope.currentPlan;
    $scope.paymentShowing = false;
    $scope.isBasic = true;
    $scope.price = 19;
    function initialValues() {
        if (fields.payment) {
            $scope.currentPlan = fields.plan;
            if ($scope.currentPlan === 'beta_monthly') {
                $scope.isBasic = false;
                $scope.selectedPlan = 'beta_monthly';
                $scope.planType = 'Monthly';
                $scope.price = 29;
            } else if ($scope.currentPlan === 'beta_yearly') {
                $scope.isBasic = false;
                $scope.selectedPlan = 'beta_yearly';
                $scope.planType = 'Annual';
                $scope.price = 19;
            } else {
                $scope.monthlyChecked = true;
                $scope.isBasic = true;
                $scope.planType = 'Basic';
            }
        } else {
            $scope.currentPlan = 'basic';
            $scope.planType = 'Basic';
        }
    }
    $scope.annualPlan = function() {
        $scope.selectedPlan = 'beta_yearly';
        $scope.price = 19;
    };
    $scope.monthlyPlan = function() {
        $scope.selectedPlan = 'beta_monthly';
        $scope.price = 29;
    };
    window.document.title = "very.gd - Pricing";
});
 app.controller('StaticPageController', function($scope) {
    $('body').removeClass().addClass('static');
    window.document.title = "very.gd - Quickly publish, prototype, and storyboard for VR and 360° video.";
});