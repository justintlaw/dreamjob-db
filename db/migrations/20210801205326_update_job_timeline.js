
exports.up = function(knex) {
  return knex.schema
    .alterTable('job_timeline', table => {
      table.dropForeign('timelineId')
      table
        .foreign('timelineId')
        .references('timeline.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .alterTable('job_timeline', table => {
      table.dropForeign('timelineId')
      table
        .foreign('timelineId')
        .references('timeline.id')
        .onUpdate('NO ACTION')
        .onDelete('NO ACTION')
    })
};
