function ContactConfig($stateProvider) {
    'ngInject'

    $stateProvider
        .state(
            'app.contact', {
                url: '/contact',
                controller: 'ContactController',
                controllerAs: '$ctrl',
                templateUrl: './contact/contactIndex.html' ,
                title: 'Contact'
            }
        )
}

export default ContactConfig
