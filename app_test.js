var express = require('express');
var app = express();

// view engine 템플릿 사용을 명시합니다.
app.set('views', __dirname, '/views');
app.set('view engine', 'ejs');

var data = [
    {title: 'cat1'},
    {title: 'cat2'},
    {title: 'cat3'}
]

app.use(express.static('./'))
app.get('/', function(req, res){
    res.render('index', {title:'Cats', cats: data})
});


app.listen(3000);
