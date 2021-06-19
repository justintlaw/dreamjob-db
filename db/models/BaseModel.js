const { Model } = require('objection')
const { v4: uuidv4 } = require('uuid')

class BaseModel extends Model {
  async $beforeInsert (context) {
    const idColumn = this.constructor.idColumn
    const schema = this.constructor.jsonSchema

    if (idColumn && schema.properties[idColumn]?.format === 'uuid' && !this.id) {
      this.id = uuidv4()
    }

    await super.$beforeInsert(context)
  }
}

module.exports = { BaseModel }
