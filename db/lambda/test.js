'use strict'

const path = require('path')
const Knex = require('knex')
const knexConfig = require('../knexfile')

class DbMigrationSource {
  getMigrations() {
    return Promise.resolve()
  }
}

const knex = Knex(knexConfig.development)

console.log('hi')
console.log(path.join(__dirname, '../'))

// knex.migrate.latest({
//   migrationSource: path.join(__dirname, '../')
// })

async function migrate() {
  try{
    await knex.migrate.latest()
    console.log('hey')
  }
  catch {
    console.log('failed')
  }
  console.log('done')
}

migrate().then(val => console.log(val))