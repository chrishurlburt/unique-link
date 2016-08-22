var express = require('express');
var router = express.Router();

const crypto = require('crypto')
const connection = require('../middleware/connection')
const r = require('rethinkdb')


/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  })
  .post('/', connection, (req, res, next) => {

    let user = {
      email: req.body.email,
      link: crypto.createHash('md5').update(req.body.email).digest('hex'),
      entries: 1
    }

    r.table('users')
      .insert(user, {returnChanges: true})
      .run(global.db, (err, result) => {
        if (err) throw err
        console.log(result)

        res.send(result.changes[0].new_val)

      })
  })
  .post('/entries', connection, (req, res, next) => {

    r.table('users')
      .filter({email: req.body.email})
      .pluck('entries')
      .run(global.db, (err, cursor) => {
          if (err) throw err
          cursor.toArray().then((result) => {
            res.send(result)
          })

      })

  })

module.exports = router;
