const app = require('express').Router()
const Hotel = require('../../model/hotels')


app.get('/', (req, res) => {
    console.log('get item')
    Hotel.find({}, (err, items) => {
        if (!items) return res.status(500).send('BD not find')
        res.status(200).json(items)
    })

})

app.get('/:slug', (req, res) => {
    console.log('get item by slug')
    const slug = req.params.slug
    Hotel.findOne({slug:slug}, (err, item) => {
        if (!item) return res.status(500).send('item not find')
        res.status(200).json(item)
    })

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
            name : names[Math.floor(Math.random() * names.length)],
            location : "Valencia",
            type : types[Math.floor(Math.random() * types.length)],
            img : "",
            components : [],
            rooms : []
        }
        let item = new Hotel(hotel)
        item.save((err, itemStored) => {
            if (!itemStored) return console.log(err)
            console.log(itemStored)
        })
    }

}

module.exports = app
