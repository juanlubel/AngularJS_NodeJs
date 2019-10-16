class User {
    constructor($http, JWT, $state, $q) {
        this._http = $http
        this.route = 'http://localhost:3000/api' + '/users'
        this.current = null
        this.error = null
        this._JWT = JWT
        this._$state = $state
        this._$q = $q
    }

    socialLogin() {
        let route = '/socialLogin';
        return this._http.get(
            `${this.route}${route}`,
        ).then((response) => {
            this._JWT.save(response.data.user.token);
            this.current = response.data.user
            this._$state.go('app.home', null, {reload: true});
            return response
        })
            .catch((error) => {
                this.error = error
                return error
            })
    }

    attemptAuth(type, credentials) {
        let route = (type === 'login') ? '/login' : '/';
        return this._http.post(
            `${this.route}${route}`,
            credentials
        )
            .then((response) => {
                this._JWT.save(response.data.token);
                this.current = response.data
                return response
            })
            .catch((error) => {
                this.error = error
                return error
            })
    }

    verifyAuth() {
        let deferred = this._$q.defer();

        // check for JWT token
        if (!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);

        } else {
            this._http({
                url: this.route + '/user/',
                method: 'GET',
                headers: {
                    Authorization: 'Token ' + this._JWT.get()
                }
            }).then(
                (res) => {
                    this.current = res.data.user;
                    deferred.resolve(true);
                },
                (err) => {
                    this._JWT.destroy();
                    deferred.resolve(false);
                }
            )
        }

        return deferred.promise;
    }

    update(data) {
        return this._http.put(
            `${this.route}/user`,
            data
        )
            .then(
                (res) => {
                    this.current = res.data;
                    return res.data;
                })
    }

    ensureAuthIs(bool) {
        let deferred = this._$q.defer();

        this.verifyAuth().then((authValid) => {
            if (authValid !== bool) {
                this._$state.go('app.home')
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }

        });

        return deferred.promise;
    }

    logout() {
        this.current = null;
        this._JWT.destroy();
        this._$state.go(this._$state.$current, null, {reload: true});
    }
}

export default User
