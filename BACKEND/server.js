'use strict'

require('module-alias/register')
require('dotenv').config()

const Glue = require('@hapi/glue')
// const Glob = require('glob')
const serverConfig = require('./config/manifest')

const options = {
  ...serverConfig.options,
  relativeTo: __dirname
}

const startServer = async () => {
  try {
    const server = await Glue.compose(
      serverConfig.manifest,
      options
    )

    // const services = Glob.sync('server/services/*.js')
    // services.forEach(service => {
    //   server.registerService(require(`${process.cwd()}/${service}`))
    // })

    await server.start()

    console.log('Server running on %s', server.info.uri)

  } catch (err) {
    console.error(err)
    process.exit(1)
  }

}

startServer()
