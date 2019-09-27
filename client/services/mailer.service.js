export default class Mailer {
    constructor($http) {
        this._$http = $http
    }

    send(email) {
        email.from = "juanluis.belda@gmail.com"
        console.log('mailer.service')
        return this._$http.post(
            'http://localhost:3000/api/send_mail',
            {
                ...email,
                option: 'contact'
            }
        )
            .then((response) => response)
            .catch((error) => error)
    }

}
