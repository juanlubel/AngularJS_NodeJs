import angular from 'angular'
import './style.css'
/*Import dependencies*/
import 'angular-ui-router'
import toastr from 'angular-toastr'
import ngSidebarJs from 'angular-sidebarjs'
import ngMaterials from 'angular-material'
/*Import config*/
import constants from './config/app.constants';
import appConfig from './config/app.config'
/*Import modules*/
import './layout'
import './contact'
import './home'
import './services'
import './components'
import './hotels'
import './auth'
import './settings'

const requires = [
    'ui.router',
    'app.layout',
    'app.home',
    'app.contact',
    'app.services',
    'app.components',
    'app.hotel',
    'app.auth',
    'app.settings',
    toastr,
    ngSidebarJs,
    // ngAnimate,
    ngMaterials,
    // ngAria
]

window.app = angular.module('app', requires)

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig)

angular.bootstrap(document, ['app'], {

});
