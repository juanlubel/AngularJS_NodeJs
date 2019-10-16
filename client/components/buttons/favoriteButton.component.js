class FavoriteButtonComponent {
    constructor(Hotels, User, $state) {
        this._User = User
        this._Hotels = Hotels
        this._$state = $state
    }

    submit() {
        if (!this._User.current) {
            this._$state.go('app.register');
            return;
        }

        let method = this.hotel.favorited ? 'DELETE' : 'POST'

        this._Hotels.favorite(this.hotel.slug, method).then(() => {
                this.hotel.favorited = !this.hotel.favorited
                this.hotel.favorited ? this.hotel.favoritesCount++ : this.hotel.favoritesCount--
            }
        )
    }

}

let favoriteButtonComponent = {
    transclude: true,
    bindings: {
        hotel: '='
    },
    controller: FavoriteButtonComponent,
    templateUrl: 'components/buttons/favoriteButton.html'
}

export default favoriteButtonComponent
