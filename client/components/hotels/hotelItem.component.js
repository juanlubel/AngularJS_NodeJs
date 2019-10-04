class HotelItemComponent {
    constructor() {

    }

}

let hotelItemComponent = {
    transclude: true,
    bindings: {
        hotel: '='
    },
    controller: HotelItemComponent,
    templateUrl: 'components/hotels/hotelItem.html'
}

export default hotelItemComponent
