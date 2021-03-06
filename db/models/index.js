'use strict'

const { Model } = require('objection')
const Knex = require('knex')

const { BaseModel } = require('./BaseModel')
const { UserModel } = require('./User')
const { JobModel } = require('./Job')
const { SkillModel } = require('./Skill')
const { TimelineModel } = require('./Timeline')

module.exports = (config) => {
  const knex = Knex({
    client: config.client,
    connection: {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    }
  })

// module.exports = () => {
//   const knex = Knex({
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       user: 'root',
//       password: 'password',
//       database: 'dreamjob_db'
//     }
//   })
  

  Model.knex(knex)

  return {
    BaseModel,
    UserModel,
    JobModel,
    SkillModel,
    TimelineModel
  }
}
