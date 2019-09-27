export default class Toastr {
    constructor(toastr) {
        this.toastr = toastr
    }
    show(status = 200, msg = "Well done!") {
        let type = ''
        if (status === 200) {
            type = 'success'
        }
        if (status === 401) {
            type = 'error'
            msg = 'something wrong'
        }
        this.toastr[type](msg)
    }
}
