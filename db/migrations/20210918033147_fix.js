
exports.up = function(knex) {
  return knex.schema
    .alterTable('timeline', table => {
      table.dropUnique('name')
      table.unique(['name', 'userId'])
    })
};

exports.down = function(knex) {
  return knex.schema
    .alterTable('job_timeline', table => {
      table.dropUnique(['name', 'userId'])
      table.unique('name')
    })
};