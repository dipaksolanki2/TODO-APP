'use strict'

const config = require('config')
const mongoose = require('mongoose')
const Config = JSON.parse(JSON.stringify(config))

const swaggerOptions = {
  info: {
    title: 'Form Array Task',
    version: require('../package.json').version,
    description: 'Form Array Task -> School Form'
  },
  // documentationPath: '/docs',
  // basePath: '/api',
  tags: [],
  grouping: 'tags',
//   securityDefinitions: {
//     jwt: {
//       type: 'apiKey',
//       name: 'Authorization',
//       in: 'header'
//     }
//   },
//   security: [
//     {
//       jwt: []
//     }
//   ]
}

const DEFAULT = 'default'

let plugins = []

mongoose.set('debug', true)

// const ENV = config.util.getEnv('NODE_ENV').trim()

// if (ENV !== DEFAULT) {
//   swaggerOptions.schemes = ['https', 'http']
//   swaggerOptions.host = Config.constants.BASE_PATH
//   mongoose.set('debug', true)
// }

// if (ENV !== PRODUCTION) {
//   plugins = [
//     {
//       plugin: '@hapi/inert'
//     },
//     {
//       plugin: '@hapi/vision'
//     },
//     {
//       plugin: 'hapi-swagger',
//       options: swaggerOptions
//     },
//     {
//       plugin: 'hapi-dev-errors',
//       options: {
//         showErrors: process.env.NODE_ENV !== 'production',
//         toTerminal: true
//       }
//     }
//   ]
// }

plugins = plugins.concat([
  {
    // ! DB CONNECTION
    plugin: '@plugins/mongoose.plugin',
    options: {
      connections: Config.connections
    }
  },
  {
    plugin: '@routes/root.route'
  }
])

const routesOb = {
  // 'auth.route': 'auth',
  // 'app-setting.route': 'app-setting',
  // 'admin.route' : 'admin',
  // 'role.route': 'role',
  'todo.route' : 'todo',
}

const routes = Object.keys(routesOb)

routes.forEach(r => {
  plugins = plugins.concat([
    {
      plugin: `@routes/${r}`,
      routes: {
        // prefix: `/api/v1${routesOb[r] ? `/${routesOb[r]}` : ``}`
      }
    }
  ])
})

exports.manifest = {
  server: {
    router: {
      stripTrailingSlash: true,
      isCaseSensitive: false
    },
    routes: {
      security: {
        hsts: false,
        xss: 'enabled',
        noOpen: true,
        noSniff: true,
        xframe: false
      },
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Authorization', 'Content-Type']
      },
      validate: {
        failAction: async (request, h, err) => {
          request.server.log(
            ['validation', 'error'],
            'Joi throw validation error'
          )
          throw err
        }
      },
    //   auth: false
    },
    debug: Config.debug,
    // port: Config.port,
    port: 3000,
    host: 'localhost',
  },
  register: {
    plugins
  }
}

exports.options = {}
