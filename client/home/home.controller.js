class HomeCtrl {
    constructor(Hotels, User) {
        this._hotelsProvider = Hotels
        this.hotels = []
        this.hotel = null
        this.User = User
        this.loadHotels()
    }

    loadHotels () {
       this._hotelsProvider.getAll().then((res) => {
           this.hotels = res.data
       })
    }

    login(data) {
        this.User.attemptAuth('user', data)
    }


}

export default HomeCtrl
