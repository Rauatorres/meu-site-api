const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
multiparty = require('connect-multiparty'),
consign = require('consign'),
session = require('express-session')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('src/public'))
app.use(multiparty())
app.use(session({
    secret: 'dsmaldmsalasdml',
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.set('views', 'src/views')

consign().
    include('./configs/database.js').
    then('./src/routes').
    then('./src/controllers').
    then('./src/model').
    into(app)

module.exports = app
