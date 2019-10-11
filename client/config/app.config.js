import authInterceptor from "./auth.interceptor";

function AppConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push(authInterceptor);

    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'layout/app-view.html',
            resolve: {
                auth: function(User) {
                    return User.verifyAuth();
                }
            }
        });

    $urlRouterProvider.otherwise('/');
}

export default AppConfig
