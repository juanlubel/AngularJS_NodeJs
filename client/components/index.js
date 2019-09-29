import angular from 'angular'

let componentsModule = angular.module('app.components', [])

import sidebarComponent from "./sidebar/sidebar.component";
componentsModule.component('sideBar', sidebarComponent)

import hotelListComponent from "./hotels/hotelList.component";
componentsModule.component('hotelList', hotelListComponent)

export default componentsModule
