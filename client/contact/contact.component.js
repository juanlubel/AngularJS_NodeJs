class ContactCtrl {
    constructor(Mailer, Toastr) {
        console.log('hola contact component')
        this.email = {
            subject : '',
            to : '',
            text : ''
        }
        this.title = 'Contact Us!'
        this.mailer = Mailer
        this.toastr = Toastr
    }

    send() {
        this.mailer.send(this.email).then((response) => {
            console.log(response)
            this.toastr.show(response.status, response.data.text)
        })
    }
}

let contactComponent = {
    controller: ContactCtrl,
    templateUrl: 'contact/contact.html'
}

export default contactComponent
