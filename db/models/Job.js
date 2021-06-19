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
      required: ['title', 'type'],

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
        updated_at: { type: 'timestamp' }
      }
    }
  }

  static get relationMappings() {
    const Skill = require('./Skill')

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
      }
    }
  }
}

module.exports = {
  JobModel
}
