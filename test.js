'use strict'

const Knex = require('knex')
const { Model } = require('objection')
const { JobModel } = require('./db/models/Job')
const { SkillModel } = require('./db/models/Skill')
const { UserModel } = require('./db/models/User')

const knex = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'dreamjob_db'
  }
})

Model.knex(knex)

// async function createSchema() {
//   if (await knex.schema.hasTable('job')) {
//     return
//   }

//   await knex.schema.createTable('job', table => {
//     table.uuid('id').primary()
//     table.string('title')
//     table.string('location')
//     table.string('description')
//     table.decimal('salary')
//     table.string('company')
//     table.string('type')
//     table.boolean('is_intern')
//     table.time('post_date')
//     table.timestamp('created_at').defaultTo(knex.fn.now())
//     table.timestamp('updated_at').defaultTo(knex.fn.now())
//   })

//   await knex.schema.createTable('skill', table => {
//     table.uuid('id').primary()
//     table.string('name')
//   })
//     .then(() => knex.raw(onInsertTrigger('skill')))
// }

// createSchema()
//   .then(() => main())
//   .then(() => knex.destroy())
//   .catch(err => {
//     console.error(err)
//     return knex.destroy()
//   })

async function main() {
  // await Job.query().delete()

  await JobModel.query().insert({
    title: 'Fullstack Developer',
    location: 'Lehi, UT',
    description: 'Make lots of money doing what you love.',
    salary: '105000',
    company: 'Cool Fintech Company',
    type: 'full-time'
  })

  await JobModel.query().insert({
    title: 'Frontend Developer',
    location: 'Dallas, TX',
    description: 'Make lots of money doing what you love.',
    salary: 95000,
    company: 'Cool Startup',
    type: 'full-time'
  })

  // await Skill.query().delete()

  await SkillModel.query().insert({
    name: 'HTML',
  })

  await SkillModel.query().insert({
    name: 'Javascript',
  })

  await SkillModel.query().insert({
    name: 'CSS',
  })

  await SkillModel.query().insert({
    name: 'Node.js',
  })

  const skill = await SkillModel
    .query()
    .findOne({
      name: "Node.js"
    })

  const job = await JobModel
    .query()
    .findOne({
      title: "Fullstack Developer"
    })

  const test = await job
    .$relatedQuery('skills')
    .relate(skill.id)

  await UserModel.query().insert({
    email: 'test@mail.com',
    first_name: 'Bob',
    last_name: 'Dole'
  })

  const user = await UserModel
    .query()
    .findOne({
      email: 'test@mail.com',
    })

  await user
    .$relatedQuery('skills')
    .relate(skill.id)

  await user
    .$relatedQuery('jobs')
    .relate(job.id)
}

main()
  .then(() => knex.destroy())
  .catch(err => {
      console.error(err)
      return knex.destroy()
  })
