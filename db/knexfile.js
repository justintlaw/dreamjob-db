// Update with your config settings.

const path = require('path')

const migrations = {
  directory: path.join(__dirname, 'migrations')
}

module.exports = {

  development: {
    client: "mysql",
    connection: {
      host: "cdavq3ky3xal8j.cnte8lthhyhv.us-east-1.rds.amazonaws.com",
      user:"admin",
      password: "pFqp5QISjOqdsb6Wx8VPNz1hg5,FeR",
      database: "dreamjobDB",
      port: 3306
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