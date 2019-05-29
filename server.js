var express = require('express');
var login = require('./routes/loginroutes.js');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
// 들어오는 json 파일을 파싱하기 위해서 express 프레임워크를 사용하고,
// 미들웨어로 bodyparser를 사용하고 있다.

app.use( bodyParser.urlencoded({ extended: true}) );
app.use( bodyParser.json());

// req : 요청 오브젝트 
// res : 응답 오브젝트

app.use(function(req, res, next) {
    // cross 도메인 요청을 처리하기 위해 필수적이다.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//test router

// why not work ?! 
router.get('/', function(req, res){
    res.json({ message: ['Welcome to our upload module apis ']});
});

//route to handle user registration
router.post('./register', login.register);
router.post('/login', login.login)

app.use('/api', router);
app.listen(5000);

