require('colors')

function beauty (route, color = 'green', title = 'Api REST') {
    let msg = `${title} => ${route}`
    let border = minus(msg)
    console.log(
        (`${border}\n${msg}\n${border}`)[color]
    )
}

function minus (msg) {
    let res = ''
    msg.split('').forEach(() => {
        res += '-'
    })
    return res
}

module.exports = {
    beauty: beauty
}
