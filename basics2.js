var express = require('express');

const app = express();

app.get('/',function(req,res){
    res.write("<h1> Index page.</h1>");
});

app.get('/p1',function(req,res){
    res.write("<h1>Page 1.</h1>");
});

var server = app.listen(8080,function(){
    var port = server.address().port;
    console.log("server running at http://localhost:%s",port);
});