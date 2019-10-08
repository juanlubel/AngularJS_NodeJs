class User {
    constructor($http) {
        this._http = $http

        this.current = null
    }

    attemptAuth(type, credentials) {
        console.log(credentials)
        this.current = credentials
    }
}

export default User
