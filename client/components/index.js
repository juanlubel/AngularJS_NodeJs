import angular from 'angular'

let componentsModule = angular.module('app.components', [])

import sidebarComponent from "./sidebar/sidebar.component";
componentsModule.component('sideBar', sidebarComponent)

export default componentsModule
