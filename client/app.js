import angular from 'angular'
import './style.css'

/*Import dependencies*/
import 'angular-ui-router'
import toastr from 'angular-toastr'
import ngSidebarJs from 'angular-sidebarjs'
import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMaterials from 'angular-material'

/*Import config*/
import appConfig from './config/app.config'
import appRun from './config/app.run'


/*Import modules*/
import './layout'
import './contact'
import './home'
import './services'
import './components'
import './hotels'

const requires = [
    'ui.router',
    'app.layout',
    'app.home',
    'app.contact',
    'app.services',
    'app.components',
    'app.hotel',
    toastr,
    ngSidebarJs,
    // ngAnimate,
    ngMaterials,
    // ngAria
]

window.app = angular.module('app', requires)

angular.module('app').config(appConfig)

angular.bootstrap(document, ['app'], {

});
