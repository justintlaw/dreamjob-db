// TODO
// - make join tables have composite primary keys
exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.uuid('id').primary()
      table.string('email').unique().notNullable()
      table.string('name')
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
      table.uuid('userId').references('user.id').notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })

    .createTable('skill', table => {
      table.uuid('id').primary()
      table.string('name').unique().notNullable()
    })

    .createTable('timeline', table => {
      table.uuid('id').primary()
      table.string('name').unique().notNullable()
      table.boolean('current_preset').notNullable().defaultTo(false)
      table.uuid('userId').references('user.id')
    })

    .createTable('job_timeline', table => {
      table.uuid('jobId').references('job.id').notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.uuid('timelineId').references('timeline.id').notNullable()
      table.date('startDate').unique().notNullable()
      table.date('endDate').unique().notNullable()
      table.unique(['jobId', 'timelineId'])
    })

    .createTable('job_skill', table => {
      table.uuid('jobId').references('job.id')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.uuid('skillId').references('skill.id')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.unique(['jobId', 'skillId'])
      // table.primary(['jobId', 'skillId'])
    })

    .createTable('user_skill', table => {
      table.uuid('userId').references('user.id').notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.uuid('skillId').references('skill.id').notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.unique(['userId', 'skillId'])
      // table.primary(['userId', 'skillId'])
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_skill')
    .dropTableIfExists('job_skill')
    .dropTableIfExists('job_timeline')
    .dropTableIfExists('timeline')
    .dropTableIfExists('job')
    .dropTableIfExists('skill')
}
