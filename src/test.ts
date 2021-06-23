import 'source-map-support/register'
process.env.NODE_ENV = 'test'
process.env.SNAPSHOT_DRY = '1'
// process.env.SNAPSHOT_UPDATE = '1'

//eslint-disable-next-line
// const SegfaultHandler = require('segfault-handler')
// SegfaultHandler.registerHandler('crash.log')

import * as dotenv from 'dotenv'
import { join } from 'path'
const dotenvPath = join(__dirname, '..', '.env')
dotenv.config({ path: dotenvPath })

import * as chaiAsPromised from 'chai-as-promised'
// import * as nock from 'nock'
import * as chai from 'chai'
chai.use(chaiAsPromised)
