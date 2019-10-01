class HotelListComponent {
    constructor() {

    }

}

let hotelListComponent = {
    transclude: true,
    bindings: {
        hotels: '<'
    },
    controller: HotelListComponent,
    templateUrl: 'components/hotels/hotelList.html'
}

export default hotelListComponent
