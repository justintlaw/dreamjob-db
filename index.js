'use strict'

const Models = require('./db/models')

// const database = Models()

module.exports = (config) => {
  return {
    database: Models(config)
  }
}
