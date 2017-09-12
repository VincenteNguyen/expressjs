var express = require('express');
var app = express()
var router = express.Router();


/* GET users listing. */
router.use(function (req, res, next) {
  console.log('User Time:', Date.now())
  next()
})

// router.use('/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })


// router.get('/:id', function (req, res, next) {
//   // if the user ID is 0, skip to the next router
//   if (req.params.id === '0') next('route')
//   // otherwise pass control to the next middleware function in this stack
//   else next()
// }, function (req, res, next) {
//   // render a regular page
//   res.render('regular')
// })

// router.get('/:id', function (req, res, next) {
//   console.log(req.params.id)
//   res.render('special')
// })

router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', function (req, res) {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  res.sendStatus(401)
})




module.exports = router;
