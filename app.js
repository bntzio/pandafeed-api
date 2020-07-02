require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Configure mongoose
const mongoose = require("mongoose");

mongoose
 .connect(process.env.DB, {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
 })
 .then((x) => {
     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
 })
 .catch((err) => {
     console.error("Error connecting to mongo", err);
 });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
