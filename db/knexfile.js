// Update with your config settings.

const path = require('path')

const migrations = {
  directory: path.join(__dirname, 'migrations')
}

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'dreamjob_db'
    },
    migrations
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'dreamjob_db'
    },
    migrations
  },

  production: {
    client: 'mysql',
    connection: {
      host: '0.0.0.0',
      user: 'root',
      password: 'password',
      database: 'dreamjob_db'
    },
    migrations
  }
}