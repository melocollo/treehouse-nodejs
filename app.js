// note: installed nodemon using npm so we don't need to keep stopping and restarting express server
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// use pug to edit html
app.set('view engine', 'pug');

// use bodyparser and cookieparser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// use static assets, such as css stylesheets, which are all in the folder called public
// without '/static', you could go to localhost:3000/stylesheets/style.css to view css...
// ...with '/static', you have to go to localhost:3000/static/stylesheets/style.css
app.use('/static', express.static('public'));

// import gets and posts from routes/index.js file
const mainRoutes = require('./routes/index')
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// handle 404 errors
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
})
// custom error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

// creates local server
// run with node.js command prompt, then cd to project folder, then run nodemon
// view site at localhost:3000
app.listen(3000, () => {
  console.log('The app is running on localhost:3000')
});
