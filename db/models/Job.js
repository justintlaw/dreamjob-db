'use strict'

const { BaseModel } = require('./BaseModel')
const path = require('path')

class JobModel extends BaseModel {
  static tableName() {
    return 'job'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'type', 'userId'],

      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        title: { type: 'string' },
        location: { type: 'string' },
        description: { type: 'string' },
        salary: { type: 'decimal' },
        company: { type: 'string' },
        type: { 
          type: 'string',
          enum: ['full-time', 'part-time']
        },
        is_intern: { type: 'boolean' },
        post_date: { type: 'date' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' },
        userId: {
          type: 'string',
          format: 'uuid'
        }
      }
    }
  }

  static get relationMappings() {
    return {
      skills: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Skill'),
        join: {
          from: 'job.id',
          through: {
            from: 'job_skill.jobId',
            to: 'job_skill.skillId'
          },
          to: 'skill.id'
        }
      },
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'job.userId',
          to: 'user.id'
        }
      }
    }
  }
}

module.exports = {
  JobModel
}
