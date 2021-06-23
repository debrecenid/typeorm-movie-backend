//eslint-disable-next-line
const { Config } = require('@foal/core')

const dbUrl = Config.get2('database.url')

process.chdir(__dirname)
// console.log(6, config)
const config = {
  type: Config.get('database.type'),
  url: process.env.DATABASE_URL || dbUrl,
  database: Config.get2('database.database', 'string'),
  dropSchema: Config.get2('database.dropSchema', 'boolean', false),
  entities: ['build/app/**/*.entity.js'],
  migrations: ['build/migrations/*.js'],
  seeds: ['build/app/database/seeds/**/*.js'],
  factories: ['build/app/database/factories/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: Config.get2('database.synchronize', 'boolean', false),
  logging: false,
}

module.exports = config
