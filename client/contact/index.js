import angular from 'angular'


let contactModule = angular.module('app.contact', [])

/*import ContactConfig from "./contact.config"
contactModule.config(ContactConfig)*/

import ContactCtrl from './contact.controller'
contactModule.controller('ContactController', ContactCtrl)

import ContactComponent from './contact.component'
contactModule.component('contactForm', ContactComponent)


export default contactModule

