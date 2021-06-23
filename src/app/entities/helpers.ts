import { Config } from '@foal/core'

export const getDateColumnType = () =>
  Config.get('database.type') === 'postgres' ? 'timestamptz' : 'datetime'
