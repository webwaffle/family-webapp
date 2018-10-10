var app = require('express')();
var ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index')
})