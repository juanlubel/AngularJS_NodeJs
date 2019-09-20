'use strict'

export default class Salute {
    constructor(name) {
        this.name = name
    }
    hello() {
        console.log(`hola ${this.name}`)
    }
    goodbye() {
        console.log(`Adios ${this.name}`)
    }
}
