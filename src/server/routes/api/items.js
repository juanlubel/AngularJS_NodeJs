const Router = require('express')
const app = Router()

app.get('/item', ()=>{
    console.log('get item')
})

app.post('/item', ()=>{
    console.log('post item')
})

app.delete('/item', ()=>{
    console.log('delete item')
})

app.put('/item', ()=>{
    console.log('put item')
})
