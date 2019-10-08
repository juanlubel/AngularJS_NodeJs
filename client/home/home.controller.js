

class HomeCtrl {
    constructor(Hotels, User) {
        console.log(Hotels)
        this._hotelsProvider = Hotels
        this.hotels = []
        this.hotel = null
        this.User = User
        this.loadHotels()
    }

    loadHotels () {
       this._hotelsProvider.getAll().then((res) => {
           console.log(res)
           this.hotels = res.data
       })

    }

    login(data) {
        console.log(data, "In home controller");
        this.User.attemptAuth('user', data)
    }


}

export default HomeCtrl
