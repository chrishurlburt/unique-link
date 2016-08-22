const r = require('rethinkdb')
const env = require('dotenv').config()
module.exports = function (req, res, next) {
  r.connect({
    port: env.DATABASE_PORT,
    host: env.DATABASE_HOST,
    db: env.DATABASE_NAME
  })
  .then((connection) => {
      global.db = connection
      next()
  })
}
