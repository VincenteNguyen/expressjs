var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var birds = require('./routes/birds')
var index = require('./routes/index');
var users = require('./routes/users');



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
app.use(myLogger);
app.use(requestTime);
app.use('/birds', birds);

app.route('/book')
.get(function (req, res) {
  res.send('Get a random book')
})
.post(function (req, res) {
  console.log('Add a book')
  res.send('Add a book')
})
.put(function (req, res) {
  console.log('Update the book')
  res.send('Update the book')
})

// app.get(/a/, function (req, res) {
//   res.send('/a/')
// })

app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})

app.get('/vu', function(req, res){
  res.send('Hello Worlds!');
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;