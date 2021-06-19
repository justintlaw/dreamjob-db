'use strict'

const { Model } = require('objection')
const Knex = require('knex')

const { BaseModel } = require('./BaseModel')
const { UserModel } = require('./User')
const { JobModel } = require('./Job')
const { SkillModel } = require('./Skill')

module.exports = () => {
  const knex = Knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'dreamjob_db'
    }
  })

  Model.knex(knex)

  return {
    BaseModel,
    UserModel,
    JobModel,
    SkillModel
  }
}
