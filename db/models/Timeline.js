'use strict'

const { BaseModel } = require('./BaseModel')
const path = require('path')

class TimelineModel extends BaseModel {
  static tableName() {
    return 'timeline'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'name', 'current_preset' ],

      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        name: { type: 'string' },
        current_preset: { type: 'boolean' },
        userId: {
          type: 'string',
          format: 'uuid'
        }
      }
    }
  }

  static get relationMappings() {
    const User = require('./User')
    const Job = require('./Job')

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'timeline.userId',
          to: 'user.id'
        }
      },
      jobs: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Job'),
        join: {
          from: 'timeline.id',
          through: {
            from: 'job_timeline.timelineId',
            to: 'job_timeline.jobId',
            extra: [ 'startDate', 'endDate' ]
          },
          to: 'job.id'
        }
      }
    }
  }
}

module.exports = { TimelineModel }
