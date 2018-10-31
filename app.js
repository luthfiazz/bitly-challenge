const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tracksRouter = require('./routes/tracks');
const shortUrlsRouter = require('./routes/shortUrls');
const authRouter = require('./routes/auth');
const linkRouter = require('./routes/link');

const app = express();
const passport = require('passport')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tracks', tracksRouter);
app.use('/api',shortUrlsRouter);
app.use('/auth',authRouter)
app.use('/',linkRouter)


app.listen(5000,function(){
    console.log('app running ' + 5000)
})

module.exports = app;
 