class SettingsCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.formData = {
      email: User.current.email,
      bio: User.current.bio,
      image: User.current.image,
      name: User.current.name,
      username: User.current.username
    }

    this.logout = User.logout.bind(User);

  }

  submitForm() {
    this.isSubmitting = true;
    console.log(this.formData)
    this._User.update(this.formData).then(
      (user) => {
        console.log(user)
        this._$state.go('app.home')
        // this._$state.go('app.profile.main', {username:user.username})
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }

}

export default SettingsCtrl;
