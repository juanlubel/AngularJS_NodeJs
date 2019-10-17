const app = require('express').Router()
const Hotel = require('../../model/Hotels')
const User = require('../../model/User')
const Comment = require('../../model/Comment')
const auth = require('../auth')

app.param('hotel', function (req, res, next, slug) {
    Hotel.findOne({slug: slug})
        .populate('author')
        .then(function (hotel) {
            if (!hotel) {
                return res.sendStatus(404);
            }

            req.hotel = hotel;

            return next();
        }).catch(next);
});

app.get('/', (req, res) => {
    console.log('get item')
    Hotel.find({}, (err, items) => {
        if (!items) return res.status(500).send('BD not find')
        res.status(200).json(items)
    })

})

app.get('/:slug', auth.optional, (req, res) => {

    console.log(req.payload);
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null
    ]).then((user) => {
            Hotel.findOne({slug: req.params.slug}, (err, item) => {
                if (!item) return res.status(500).send('item not find')
                res.status(200).json(item.toJSONFor(user[0]))
            })


        }
    )


})

app.post('/', (req, res) => {
    console.log('post item')
    const item = new Hotel(req.body)
    console.log(item)
    item.save((err, itemStored) => {
        if (!itemStored) return res.status(500).json({
            msg: "Error on insert Hotel",
            mongoMsg: err
        })

        res.status(200).json(itemStored)
    })

})

app.delete('/:id', (req, res) => {
    console.log('delete item')
    let id = req.params.id
    console.log(id)

    Hotel.findById(id, (err, item) => {
        if (!item) return res.status(500).send('Hotel not exists')

        item.remove(err => {
            if (err) return res.status(500).json({
                msg: "Error on delete item",
                mongoMsg: err.errmsg
            })
            res.status(200).json(item)
        })
    })
})


app.put('/:id', (req, res) => {
    console.log('put item')
    let id = req.params.id
    let update = req.body
    Hotel.findByIdAndUpdate(id, update, (err, item) => {
        if (err) return res.status(500).json({
            msg: "Error on update item",
            mongoMsg: err.errmsg
        })
        res.status(200).send(update)
    })
})

app.post('/:hotel/favorite', auth.required, (req, res, next) => {
    console.log('favorite')
    User.findById(req.payload.id).then((user) => {
        if (!user) return res.status(500).send('user not exists')
        user.favorite(req.hotel._id).then(() => {
            req.hotel.updateFavoriteCount().then(hotel => {
                res.status(200).json(hotel)
            })
        })
    })
})

app.delete('/:hotel/favorite', auth.required, (req, res, next) => {
    console.log('no favorite')
    User.findById(req.payload.id).then((user) => {
        if (!user) return res.status(500).send('user not exists')
        user.unfavorite(req.hotel._id).then(() => {
            req.hotel.updateFavoriteCount().then(hotel => {
                res.status(200).json(hotel)
            })
        })
    })
})

app.post('/:hotel/comment', auth.required, (req, res, next) => {
    console.log('add comment')
    User.findById(req.payload.id).then((user) => {
        if (!user) return res.status(500).send('user not exists')
        let comment = new Comment(req.body.comment)
        comment.hotel = req.hotel
        comment.user = user

        comment.save().then(async () => {
            await req.hotel.comments.push(comment)
            req.hotel.save().then((hotel) => {
                res.status(200).json({comment: comment.toJSONFor(user)})
            })
        })
    })
})

app.get('/:hotel/comment', auth.optional, (req, res, next) => {
    Promise.resolve(req.payload ? User.findById(res.payload.id) : null).then((user) => {
        req.hotel.populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).execPopulate().then(() => {
            res.status(200).json({comments: req.hotel.comments})
        })
    })
})

app.get('/test/clear', (req, res) => {
    console.log('clear data')
    /*    db.clearData('hotel')*/
    Hotel.deleteMany({}, (err, result) => {
        console.log(err, result)
        if (err) throw res.status(500).json(err)
        res.status(200).json(result)
    })
})

app.get('/test/dommies', (req, res) => {
    console.log('dommies')
    dommies()
})

function dommies() {
    console.log('dommies function')
    let names = ['Estelar', 'Paquita', 'Tres puntas']
    let types = ['Villa', 'Hostal', 'Hotel', 'Apartamentos']

    for (let i = 0; i <= 10; i++) {
        let hotel = {
            name: names[Math.floor(Math.random() * names.length)],
            location: "Valencia",
            type: types[Math.floor(Math.random() * types.length)],
            img: "",
            components: [],
            rooms: []
        }
        let item = new Hotel(hotel)
        item.save((err, itemStored) => {
            if (!itemStored) return console.log(err)
            console.log(itemStored)
        })
    }
}

module.exports = app
