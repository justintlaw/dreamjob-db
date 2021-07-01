'use strict'

const { BaseModel } = require('./BaseModel')
const path = require('path')

class UserModel extends BaseModel {
  static tableName() {
    return 'user'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'name'],

      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        email: { type: 'email' },
        name: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      jobs: {
        relation: BaseModel.HasManyRelation,
        modelClass: path.join(__dirname, 'Job'),
        join: {
          from: 'user.id',
          to: 'job.userId'
        }
      },
      skills: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Skill'),
        join: {
          from: 'user.id',
          through: {
            from: 'user_skill.userId',
            to: 'user_skill.skillId'
          },
          to: 'skill.id'
        }
      }
    }
  }
}

module.exports = { UserModel }
