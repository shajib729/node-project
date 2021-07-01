const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

// require("../db/conn")
const User = require("../model/userSchema")

router.get("/", (req,res) => {
        res.send("Hello world from Home page Router")
})

// #### Using promise create user #####

// router.post("/register", (req, res) => {
//     const {name,email,phone,work,password}=req.body
//     if (!name || !email || !phone || !work || !password) {
//         return res.status(422).json({error:"Plz filled the form"})
//     } else {
//         User.findOne({ email: email })
//         .then((userExist)=>{
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already Exist" });
//             }else {

//                 const user = new User({name, email, phone, work, password})
            
//                 user.save().then(() => {
//                     res.status(201).json({message:"User Registration Successfully"})
//                 }).catch((err) => {
//                     res.status(500).json({error:"Failed to register"})
//                 })

//             }
//         }).catch ((err)=>{
//             console.status(500).log("Server Error");
//         })
//     }
    
// })

// #### Using async await create user #####

router.post("/register", async (req, res) => {
    let {name,email,phone,work,password,cpassword}=req.body
    if (!name || !email || !phone || !work || !password) {
        return res.status(422).json({error:"Plz filled the form Correctly"})
    } else {
       try{
            const userExist = await User.findOne({ email: email })
                
           if (!userExist && password===cpassword) {
               
               
                password=await bcrypt.hash(password,10)
                    console.log(password);
               
                const user = new User({ name, email, phone, work, password })
                
                const userRegister =await user.save()
                
                if (userRegister) {
                    res.status(201).json({ message: "User Registration Successfully" })
                    console.log(userRegister);
                } else {
                    res.status(500).json({error:"Failed to register"})
                }  
            } else { 
                return res.status(422).json({ error: "Email already Exist" });             
            }

 
        }catch (err){
            res.status(500).send("Register Server Error");
            console.log("Register Server Error");
        } 
    }
    
    
})

// ####Login route using  async await####
// router.post("/signin", async (req, res) => {
    
//     try {

//         let { email, password } = req.body
    
//         if (!email || !password) {
//             return res.status(402).json({error:"Please Fill The Form"})
//         } else {
//             const userInput = await User.findOne({ email: email })
//             console.log(userInput.password);
        
//             password = await bcrypt.compare(password,userInput.password)
//             console.log(password);
            
//             if (userInput && password) {
//                 res.status(201).json({ message: "Login Successfully" });
//             } else {
//                 return res.status(402).json({error:"Invalid Info"})
//             }
            
//         }
//     } catch (err) {
//         console.log(`Login Server Error ${err}`);
//         res.status(500).send(`Login Server Error ${err}`)
//     }
// })

// ####Login route using promise####
router.post("/signin", (req, res) => {
    const { email, password } = req.body
    
    if (email && password) {
        User.findOne({ email: email })
        .then((s) => {
            bcrypt.compare(password, s.password)
            .then((hPassword) => { 
                console.log(hPassword);
                if (hPassword) {
                    res.status(202).send({message:"Login Success"})
                } else {
                    res.status(400).send({error:"Wrong Info"})
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).send({error:"Failed"})
            })
        }).catch((err) => {
            res.status(402).send({error:"Email Doesn't Exist"})
            console.log(err);
        })
    } else {
        res.status(402).send({error:"Please Fill The Form Correctly"})
    }
})

module.exports=router