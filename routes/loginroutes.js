exports.register = function (req, res) {
    var today = new Date();
    var users = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today,
        "modified": today
    }
    connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
        if(error){
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success" : "user registerd sucessfully"
            });
        }
    });
}


exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    // 이메일이 데이터베이스에 존재하는 확인하고, 유저의 패스워드가 맞는지 확인한다.
    connection.query('SELECT * FROM users WHERE email = ?', [email],
    function(error, results, fields){
        if(error){
            res.send({
                "code": 400,
                "failed" : "error ocurred"
            })
        } else {
            if(results.length > 0) {
                if(results[0].password == password) {
                    res.send ({
                        "code": 200,
                        "success" : "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "Email does not exists"
                });
            }
        }
    })
};