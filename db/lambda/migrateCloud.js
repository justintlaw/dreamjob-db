'use strict'

const {
  SecretsManagerClient,
  GetSecretValueCommand 
} = require('@aws-sdk/client-secrets-manager')

const Knex = require('knex')

const path = require('path')

const migrations = {
  directory: path.join(__dirname, '../migrations')
}

exports.handler = async function(event) {
  const { DATABASE_SECRETS_ARN } = process.env

  const client = new SecretsManagerClient({
    region: 'us-east-1'
  })

  const command = new GetSecretValueCommand({
    SecretId: DATABASE_SECRETS_ARN
  })

  const databaseSecrets = await client.send(command)

  const dbOptions = JSON.parse(databaseSecrets.SecretString)

  const knex = Knex({
    client: dbOptions.engine,
    connection: {
      host: dbOptions.host,
      user: dbOptions.username,
      password: dbOptions.password,
      database: dbOptions.dbname,
      port: dbOptions.port
    },
    migrations
  })
  
  await knex.migrate.latest()

  return {
    ...databaseSecrets
  }
}
