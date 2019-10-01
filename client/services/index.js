import angular from 'angular'
// import Axios from 'axios'

let serviceModule = angular.module('app.services', [])

// serviceModule.service('Axios', Axios)

import MailerService from './mailer.service'
serviceModule.service('Mailer', MailerService)

import ToastrService from './toastr.service'
serviceModule.service('Toastr', ToastrService)

import HotelsProvider from "./hotels.service";
serviceModule.service('Hotels', HotelsProvider)

export default serviceModule
