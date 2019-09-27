const app = require('express').Router()
const Hotel = require('../../model/hotels')


app.get('/', (req, res)=>{
    console.log('get item')
    Hotel.find({}, (err, items) => {
        if (!items) return res.status(500).send('BD not find')
        res.status(200).json(items)
    })

})

app.post('/', (req, res)=>{
    console.log('post item')

    console.log(req.body)
    let item = new Hotel(req.body)
    console.log(item)

    item.save((err, itemStored) => {
        if (!itemStored) return res.status(500).send('Error on insert Hotel')
        res.status(200).json(itemStored)
    })

})

app.delete('/:id', (req, res)=>{
    console.log('delete item')
    let id = req.params.id
    console.log(id)

    Hotel.findById(id, (err, item) => {
        if (!item) return res.status(500).send('Hotel not exists')

        item.remove(err => {
            if (err) return res.status(500).send("Error to delete")
            res.status(200).send('Hotel deleted')
        })
    })
})



app.put('/:id', (req, res)=>{
    console.log('put item')
    let id = req.params.id
    let update = req.body.data
    console.log(req.body.data)
    Hotel.findByIdAndUpdate(id, update, (err,item) => {
        if (!item) return res.status(500).send('Not item update')
        res.status(200).send(update)
    })
})

module.exports = app
