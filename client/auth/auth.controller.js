class AuthCtrl {
  constructor(User, $state, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this._toastr = Toastr

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  submitForm() {
    this.isSubmitting = true;
    this._User.attemptAuth(this.authType, this.formData)
    .then(
      (res) => {
        if (res.status === 200) {
          return this._$state.go('app.home')
        }

        this.isSubmitting = false;
        this._toastr.show(res.status, null, res.data.errors)
        this.errors = res.data.errors;

      }
    )
  }
}

export default AuthCtrl;
