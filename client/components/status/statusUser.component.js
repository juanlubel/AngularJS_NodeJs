class StatusUserComponent {
    constructor(User, $scope) {
        this._User = User
        this.user = this._User.current
        $scope.$watch('User.current',(response) => {
            this.user = response ? response : ''
        })
    }

    logout() {
        this._User.logout()
    }
}

let statusUserComponent = {
    controller: StatusUserComponent,
    templateUrl: 'components/status/statusUser.html'
}

export default statusUserComponent
