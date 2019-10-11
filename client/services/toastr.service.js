export default class Toastr {
    constructor(toastr) {
        this.toastr = toastr
    }
    show(status = 200, msg = "Well done!", error) {
        let type = ''
        if (status === 200) {
            type = 'success'
        }
        if (status !== 200) {
            type = 'error'
            msg = 'something wrong'
        }
        msg = error ? error : msg

        this.toastr[type](msg)
    }
}
