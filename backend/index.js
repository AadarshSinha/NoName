const express = require('express')
const mysql =require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'aadarsh0',
  database:'NoName',
})


app.post("/add",(req,res)=>{
   db.query(
     "INSERT INTO table2 (event , date) VALUES (?,?)",
     [req.body.Name ,req.body.Date],
     (err,result)=>{
       console.log(err)
       res.send(result)
     } 
   );
});


app.get('/get', (req, res) => {
  db.query("SELECT * FROM table2;", (err, results) => {
    if(err){
       console.log(err)
       res.send(err);
    }
    else{
      console.log(results)
      res.send(results);
    } 
  });
});


app.post('/register', (req, res) => {
    console.log("/register")
    db.query(
        "INSERT INTO table1 (username , password) VALUES (?,?)",
        [req.body.User ,req.body.Password],
        (err,result)=>{
          console.log(err)
          res.send(result)
        } 
      );
});
app.post('/login', (req, res) => {
    db.query(
        "SELECT * FROM table1 WHERE username=? && password=?",
        [req.body.User,req.body.Password],
        (err,result)=>
        {
            if(err)  
            {
                console.log(err)
                res.json({auth:false})
            }
            else
            {
                if(result.length===0) 
                {
                    console.log(result)
                    res.json({auth:false})
                }
                else
                {
                    const id=result[0].id
                    const token=jwt.sign({id},"jwtCode",{
                        expiresIn:300,
                     })
                    console.log("Logged in")
                    console.log("Token = "+token)
                    res.json({auth:true,token:token})
                }
            }
        }
    )
});

app.listen(3001, () => {
  console.log("Server started")
  db.connect((err)=>{
    if(err)
    console.log("ERROR",err)
    else
    console.log('MySql server connected ...')
})
})