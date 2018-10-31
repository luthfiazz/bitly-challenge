var express = require('express');
var router = express.Router();
const {user, shortUrl,track} = require('../db/models')

/* GET home page. */
router.get('/', async function(req, res, next) {

  const data = await shortUrl.findAll({
    include: [user,track]
  })

  res.json(data);
});

module.exports = router;
