
var express = require('express');
const app = express();
var mysql = require('mysql');

var bodyparser = require('body-parser');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'userdata'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

// POST REQUEST SENT BY USER WITH DATA FOR PROCESSING
app.post('/register/',(req,res,next)=>{

    var data = req.body;
    var password = data.password;
    var email = data.email;

    console.log(email+" "+password);

    connection.query("SELECT * FROM login_info where email = ?",[email],function(err,results,fields){
        connection.on('error',(err)=>{
            console.log("[MYSQL ERROR]",err);
        });
        
        if(result && result.length){
            res.json("user already exists.");
        }
        else{
            var insert_cmd = "INSERT INTO login_info (email,password) values (?,?)";
            values = [email,password];

            console.log("executing: "+insert_cmd+" "+values);
            connection.query(insert_cmd,values,(err,results,fields)=>{
                connection.on('err',(err)=>{
                    console.log('[MYSQL ERROR]',err);
            });
            res.json("Registered!!");
            console.log("Registration successful.");
        

        });
    }
    });
    
});

     //POST REQUEST SENT TO HANDLE LOGIN OPERATION
     app.post("/login/",(req,res,next)=>{
         var data = req.body;
         var email = data.email;
         var password = data.password;

         connection.query("SELECT * FROM login_info where email = ?",[email],(err,result,fields)=>{
             connection.on('error',(err)=>{
             console.log("[MYSQL ERROR]",err);
         });
            console.log(result);
         if(result&&result.length){
             console.log(result);

             if(password==result[0].password){
             res.json("user logged in");
             res.end;
         }else {
             res.json("wrong password.");
             res.end;
         }
         }
         else {
            res.json("user not found.");
            res.end;
        }

     });
    });





var server = app.listen(3000,()=>{
   console.log("server running at http://localhost:3000");
});

