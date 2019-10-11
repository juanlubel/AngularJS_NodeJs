class HotelListCtrl {

    constructor() {
        'ngInject';
/*        this.$onChanges = function() {

        }*/
    }

}

let hotelListComponent = {
    transclude: true,
    bindings: {
        hotels: '<'
    },
    controller: HotelListCtrl,
    templateUrl: 'components/hotels/hotelList.html'
}

export default hotelListComponent
