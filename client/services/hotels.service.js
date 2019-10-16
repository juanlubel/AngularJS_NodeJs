export default class HotelsProvider {
    constructor($http) {
        this._$http = $http
        this.route = 'http://localhost:3000/api' + '/hotels'
    }

    getAll() {
        return this._$http.get(
            `${this.route}`
        )
            .then((response) => response)
            .catch((error) => error)
    }

    getBySlug(slug) {
        return this._$http.get(
            `${this.route}/${slug}`
        )
            .then((response) => response)
            .catch((error) => error)
    }

    favorite(slug, method) {
        return this._$http({
                url: `${this.route}/${slug}/favorite`,
                method: method
            }
        )
    }

}
