var app = require('express')();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');

app.use(require('express').static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var options = {
    secret: 'yee',
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: {
        maxAge: 3600000,
        secure: false,
        httpOnly: true
    },
    name: 'my.connect.sid'
}
app.use(session(options));

app.set('view engine', 'ejs');



function fileToJson(path) {
    return JSON.parse(fs.readFileSync(path));
}
function jsonToFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, undefined, 2));
}



app.get('/', (req, res) => {
    res.render('pages/login')
})

app.post('/login-process', (req, res) => {
    var table = fileToJson('data/families.json');
    for(var i = 0; i < table.length; i++) {
        if(table[i].username == req.body.username) {
            if(table[i].password == req.body.password) {
                req.session.username = table[i].username;
                res.redirect('/home');
                return;
            } else {
                res.render('messages/wrongPassword');
                return;
            }
        }
    }
    res.render('messages/wrongUsername');
    return;
})

app.get('/home', (req, res) => {
    if(req.session.username) {
        var table = fileToJson('data/families.json');
        for(var i = 0; i < table.length; i++) {
            if(table[i].username == req.session.username) {
                res.render('pages/home', table[i])
            }
        }
    } else {
        res.redirect('/');
    }
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})

