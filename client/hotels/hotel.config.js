function HotelConfig($stateProvider) {


    $stateProvider
        .state('app.hotel', {
                url: '/hotel/:slug',
                controller: 'HotelCtrl',
                controllerAs: '$ctrl',
                templateUrl: 'hotels/hotel.html',
                title: 'Hotel',
                resolve: {
                    hotel: (Hotels, $state, $stateParams) => {
                        return Hotels.getBySlug($stateParams.slug).then(
                            (hotel) => hotel.data,
                            (err) => $state.go('app.home')
                        )
                    }
                }
            }
        )
}

export default HotelConfig
