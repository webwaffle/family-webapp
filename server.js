var app = require('express')();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var ejs = require('ejs');


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

app.get('/login-process', (req, res) => {
    var table = fileToJson('data/families.json');
    for(var i = 0; i < table.length; i++) {
        
    }
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})