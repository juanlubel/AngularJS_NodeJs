class FavoriteButtonComponent {
    constructor() {

    }

}

let favoriteButtonComponent = {
    transclude: true,
    bindings: {
        hotel: '='
    },
    controller: FavoriteButtonComponent,
    templateUrl: 'components/hotels/hotelItem.html'
}

export default favoriteButtonComponent
