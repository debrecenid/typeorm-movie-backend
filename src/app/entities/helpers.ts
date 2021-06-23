import { Config } from '@foal/core'

export const getDateColumnType = () =>
  Config.get('database.type') === 'postgres' ? 'timestamptz' : 'datetime'

export const formatQueryDate = (date: Date) =>
  Config.get('database.type') === 'postgres'
    ? date.toISOString()
    : date.toISOString().replace('T', ' ')
