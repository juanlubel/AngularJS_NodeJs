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

import UserService from "./user.service";
serviceModule.service('User', UserService)

import JWT from "./jwt.service";
serviceModule.service('JWT', JWT)

export default serviceModule
