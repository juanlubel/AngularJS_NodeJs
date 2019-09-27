
function AppConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'layout/app-view.html',
        });

    $urlRouterProvider.otherwise('/');
}

export default AppConfig
