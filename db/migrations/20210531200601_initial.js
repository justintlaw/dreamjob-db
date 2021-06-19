
exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.uuid('id').primary()
      table.string('email').notNullable()
      table.string('first_name'),
      table.string('last_name')
    })

    .createTable('job', table => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('location')
      table.string('description')
      table.decimal('salary')
      table.string('company')
      table.enum('type', ['full-time', 'part-time']).notNullable()
      table.boolean('is_intern').defaultTo(false)
      table.date('post_date')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.uuid('userId').references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })

    .createTable('skill', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
    })

    .createTable('job_skill', table => {
      table.uuid('jobId').references('job.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.uuid('skillId').references('skill.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })

    .createTable('user_skill', table => {
      table.uuid('userId').references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.uuid('skillId').references('skill.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_skill')
    .dropTableIfExists('job_skill')
    .dropTableIfExists('job')
    .dropTableIfExists('skill')
}
