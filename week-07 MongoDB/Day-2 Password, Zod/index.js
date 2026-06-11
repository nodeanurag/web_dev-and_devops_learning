const express = require("express");
const { UserModel, TodoModel } = require("./db");
const app = express()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MaiNahiBataunga"
const mongoose = require("mongoose")
const {z} = require("zod")                      //Zod ko import kiye hai 

mongoose.connect("mongodb+srv://username:password@cluster0.wm8zj.mongodb.net/todo-app-using-Hashing-&-salt")                 //.net/DATABASE_Name - idhar agar koi new database k name add krenge toh woh create kr dega aur existing mein chahiye toh uska name add kr do 

app.use(express.json())                         //body ko parse krne k liye chahiye hota hai yeh

app.post("/signup", async function(req, res){

    const requiredBody = z.object({             //idhar zod use kiye hai..jisse woh teen input lega jo ki teeno string hone chahiye 
        email : z.string().min(3).max(100).email(),                     //zod ka schema yeh hai here we multiple input validation things..this one tell ki minimum 3 characters hone chahiye max 100 and a email should be there
        name : z.string().min(3).max(100),
        password : z.string().min(3).max(100)
    }) 
    const parsedDataSuccess = requiredBody.safeParse(req.body);         //yeh data ko check kr rha ki input kiya hua data zod ke schema k accrding hai ya nahi

    if(!parsedDataSuccess.success){                     //If data is not correct then yeh response return kr do
        res.json({
            message: "Incorrect Format",
            error: parsedDataSuccess.error              //yeh return kr dega ki user jis format mein input kr rha uspe error kya hai...jisse woh resignin/signup kre sahi format mein
        })
        return
    }

    const email = req.body.email;               //yaha body pe req ja rha hai isliye eisko parse krna hai 
    const password = req.body.password;
    const name = req.body.name;

    let errorThrown = false;
    try{                                            //Tr catch use kr diye jisse kuch error bhi aye toh woh error handle ho jaye na ki server crash ho jaye 
        const hashedPassword = await bcrypt.hash(password, 5)      //will return a promise isliye await...5 isliye kyuki utne number of times woh salt ko add krke hash krega..woh nhi bhi likhnge toh chalega aur nahi likhnge toh await ka jrurt nahi
    
        await UserModel.create({                    //isko await isliye kiye may be error ho skta hai like user idhar input diya nhi but res.json se message phle mil jaye isliye isko await kiye jisse woh phle data le le phr woh res.json ka message show krega..warna await ni krenge toh then if database connect nhi hoga phr bhi woh message return kr dega 
            email: email,
            password: hashedPassword,
            name: name
        });
    }catch(e){
        res.json({
            "message": "User already exist!"
        });
        errorThrown = true
    }

    if(!errorThrown){
        res.json({
            "message": "You are signed up!"
        });
    }    
});
