class HomeCtrl {
    constructor(Hotels) {
        console.log(Hotels)
        this._hotelsProvider = Hotels
        this.hotels = []
        this.hotel = null
    }

    loadHotels () {
       this._hotelsProvider.getAll().then((res) => {
           console.log(res)
           this.hotels = res.data
       })

    }


}

export default HomeCtrl
