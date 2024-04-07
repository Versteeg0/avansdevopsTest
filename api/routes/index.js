const express = require('express')
const router = express.Router()

require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT || 8080

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
