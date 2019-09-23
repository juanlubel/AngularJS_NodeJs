'use strict'
const db = require('./db')
const app = require('./server')
const print = require('./utils/print')
const swaggerUi = require('swagger-ui-express')
const routes = require('./routes')
require('dotenv').config()

const host = process.env.API_HOST
const port = process.env.API_PORT || 3001

const swaggerDocument = require('./swagger.json')
swaggerDocument.host=host + port

app.use('/api_docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))
/*app.use('api', routes)*/
async function main() {
    try {
    await db()
    await app.listen(port, () => {
        print.beauty(host + port, 'yellow')
    })
    } catch (e) {
        console.log(e)
    }

}

main()
