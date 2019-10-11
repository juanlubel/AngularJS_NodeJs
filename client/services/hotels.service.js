export default class HotelsProvider {
    constructor($http) {
        this._$http = $http
        this.route = 'http://localhost:3000/api'
    }

    getAll() {
        return this._$http.get(
            `${this.route}/hotels`
        )
            .then((response) => response)
            .catch((error) => error)
    }

    getBySlug(slug) {
        return this._$http.get(
            `${this.route}/hotels/${slug}`
        )
            .then((response) => response)
            .catch((error) => error)
    }

    create() {

    }

    delete () {

    }

    update() {

    }


}
