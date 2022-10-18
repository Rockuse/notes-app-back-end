const Hapi = require("@hapi/hapi")
const routes = require('./routes')

async function init() {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    })
    server.route(routes)
    await server.start()
    console.log('server start')
}

init()