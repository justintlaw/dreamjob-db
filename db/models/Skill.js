'use strict'

const { BaseModel } = require('./BaseModel')
const path = require('path')

class SkillModel extends BaseModel {
  static tableName() {
    return 'skill'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { 
          type: 'string',
          format: 'uuid'
        },
        name: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Job = require('./Job')

    return {
      jobs: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Job'),
        join: {
          from: 'skill.id',
          through: {
            from: 'job_skill.skillId',
            to: 'job_skill.jobId'
          },
          to: 'job.id'
        }
      },
      users: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'skill.id',
          through: {
            from: 'user_skill.skillId',
            to: 'user_skill.userId'
          },
          to: 'user.id'
        }
      }
    }
  }
}

module.exports = {
  SkillModel
}
