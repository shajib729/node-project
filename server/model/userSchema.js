// const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// stored the message
userSchema.methods.addMessage = async function (name, email, message) {
    try {
        this.messages=this.messages.concat({name, email, message})
        await this.save();
        return this.messages;
    } catch (err) {
        console.log(err);
    }
}

// collection creation
const User = mongoose.model("USER", userSchema)

module.exports=User
