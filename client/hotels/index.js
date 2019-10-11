import angular from 'angular'


let hotelModule = angular.module('app.hotel', [])

import HotelConfig from "./hotel.config";
hotelModule.config(HotelConfig)

import HotelCtrl from "./hotel.controller";
hotelModule.controller('HotelCtrl',HotelCtrl)

export default hotelModule
