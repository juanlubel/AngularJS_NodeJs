class SocialCtrl {
    constructor(User, $state, $scope, Toastr) {
      'ngInject';

      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
      this._toaster = Toastr;

      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');

      this._User.socialLogin()
    }
  }
  export default SocialCtrl;
