/*****************conection 4 servidor*********************/

const express = require ('express')
const server = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
/*login-logout*/
const router_login_logout = require('./src/routers/login_routes')
/*login-logout...*/
/* const routeruser = require('./src/routes/user_routes') */




const PORT = process.env.PORT || 3009 

server.use((req,res , next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials",true)
    next()
})

server.get ('/', (req, res) => {
    res.send('Api Proyect')
})

server.use(bodyParser.json());
server.use('/ADB', router_login_logout )
/* server.use('/La_holandesa', routeruser )  
/*  */

server.listen(PORT,() =>{
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})
