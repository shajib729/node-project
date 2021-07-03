const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const authenticate = require ("../middleware/Authenticate")

require("../db/conn")
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
router.post("/signin", async (req, res) => {
    
    let { email, password } = req.body
    try {    
        if (!email || !password) {
            return res.status(422).send({error:"Please Fill The Form"})
        } else {
            const userInput = await User.findOne({ email: email })
            if (userInput) {
               
                // generate token
                let token=jwt.sign({ _id:userInput._id},process.env.SECRET_KEY)
                // console.log(`token : ${token}`);
                if (token) {
                    res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + 25892000000),
                        httpOnly: true
                    })
                } else {
                    res.send("Failed to create token")
                }

                const hpassword = await bcrypt.compare(password,userInput.password)
                console.log(hpassword);
                
                if (hpassword) {
                    res.status(202).send({ message: "Login Successfully" });
                } else {
                    return res.status(422).send({error:"Invalid Info"})
                }
            } else {
                res.status(422).send({error:"Email Doesn't Exist"})
                console.log(err);
            }
            
        }
    } catch (err) {
        res.status(500).send(`Login Server Error ${err}`)
    }
})

// ####Login route using promise####
// router.post("/signin", (req, res) => {
//     const { email, password } = req.body
    
//     if (email && password) {
//         User.findOne({ email: email })
//             .then((s) => {
            
//             // generate jwt 
//             s.generateAuthToken()
//             .then((token) => {
//                 console.log(token);
//                 res.cookie("jwtoken", token, {
//                     expires: new Date(Date.now() + 25892000000),
//                     httpOnly: false
//                 })
//             }).catch((err) => {
//                 res.send("Failed to create token")
//                 console.log(`Error while creating jwt --`);
//             })

//             bcrypt.compare(password, s.password)
//             .then((hPassword) => { 
//                 console.log(hPassword);
//                 if (hPassword) {
//                     res.status(202).send({message:"Login Success"})
//                 } else {
//                     res.status(422).send({error:"Wrong Info"})
//                 }
//             }).catch((err) => {
//                 console.log(err);
//                 res.status(500).send({error:"Failed"})
//             })
//         }).catch((err) => {
//             res.status(422).send({error:"Email Doesn't Exist"})
//             console.log(err);
//         })
//     } else {
//         res.status(422).send({error:"Please Fill The Form Correctly"})
//     }
// })


// about us page 
router.get("/about",authenticate,(req,res) => {
    // try{
        res.status(200).send(req.rootUser)
    // }catch(err){
    //     res.status(402).json({error:"Error In About Route"});
    //     console.log("Error In About Route");
    // }
})


// Get data in contact us page 
router.get("/getData",authenticate,(req,res) => {
        res.status(200).send(req.rootUser)
})


// contact us page 
router.post("/contact",authenticate, async (req,res) => {
    try {
        console.log(req.body);
        console.log("problem in coming req.body");
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            console.log('Plz fill the contact form perfectly');
            return res.status(422).json({ error: "Plz fill the contact form perfectly" })
        }
        const userContact = await User.findOne({ _id: rootID });
        console.log(`UserContact : ${userContact}`);
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);

            console.log(userMessage);
            
            await userContact.save();

            res.status(201).json({message:"Message has beeen sent"})
        }
        
    } catch (err) {
        console.log("Error");
    }
})

module.exports=router