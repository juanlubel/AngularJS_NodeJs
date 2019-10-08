import angular from 'angular'

let componentsModule = angular.module('app.components', [])

import sidebarComponent from "./sidebar/sidebar.component";
componentsModule.component('sideBar', sidebarComponent)

import hotelListComponent from "./hotels/hotelList.component";
componentsModule.component('hotelList', hotelListComponent)

import hotelItemComponent from "./hotels/hotelItem.component";
componentsModule.component('hotelItem', hotelItemComponent)

import favoriteButtonComponent from "./buttons/favoriteButton.component";
componentsModule.component('favoriteButton', favoriteButtonComponent)

import showAuth from './show-auth.directive'
componentsModule.directive('showAuth', showAuth)

export default componentsModule
