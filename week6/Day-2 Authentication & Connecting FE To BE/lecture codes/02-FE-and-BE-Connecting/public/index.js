const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "ilovepiratemonkeydluffy";

app.use(express.json())


const users = []


function logger (req, res,next){            //yeh ek logger middleware bnay jo bta raha hai like which req is coming to the server..aur yeh hamare terminal pe btayega ki kaunsa req aa rha hai 
    console.log(req.method + " - Request came !")
    next();
}
