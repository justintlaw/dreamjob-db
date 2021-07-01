'use strict'

const Knex = require('knex')
const { Model } = require('objection')
const { TimelineModel } = require('./db/models/Timeline')
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

// createSchema()
//   .then(() => main())
//   .then(() => knex.destroy())
//   .catch(err => {
//     console.error(err)
//     return knex.destroy()
//   })

async function main() {
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

  // await UserModel.query().insert({
  //   email: 'test@mail.com',
  //   first_name: 'Bob',
  //   last_name: 'Dole'
  // })

  // const user = await UserModel
  //   .query()
  //   .findOne({
  //     email: 'test@mail.com',
  //   })

  // await user
  //   .$relatedQuery('skills')
  //   .relate(skill.id)

  // await user
  //   .$relatedQuery('jobs')
  //   .relate(job.id)

  // await TimelineModel.query().insert({
  //   name: 'My Career Plan',
  //   current_preset: true
  // })

  // const timeline = await TimelineModel
  //   .query()
  //   .findOne({
  //     name: 'My Career Plan'
  //   })

  // await timeline
  //   .$relatedQuery('user')
  //   .relate(user.id)
}

main()
  .then(() => knex.destroy())
  .catch(err => {
      console.error(err)
      return knex.destroy()
  })
