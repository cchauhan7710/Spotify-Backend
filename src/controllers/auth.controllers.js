import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

async function register(req, res) {
    try {
        const { userName, email, password, role } = req.body;

        const isuserAlreadyExist = await userModel.findOne({
            $or: [{ userName }, { email }]
        })
        if (isuserAlreadyExist) {
            return res.status(401).json({
                message: `User Already exist with the username: ${req.body.userName} and email: ${req.body.email} `
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const sportifyUser = await userModel.create({
            userName,
            email,
            password: hash,
            role
        })



        const token = jwt.sign({
            id: sportifyUser._id,
            role: sportifyUser.role

        }, process.env.JWT_SECRET)

        res.cookie("token", token)


        console.log(token, sportifyUser)
        res.status(201).json({
            message: "User Registered SuccessFully !",
            sportifyUser,
            token,
        })

    } catch (error) {
        res.status(500).json({
            error: error.message || "internam server errorr"
        })


    }

}

async function loginUser(req,res)
{
    try {
        const {userName , email , password} = req.body;
    
        const user = await  userModel.findOne({
            $or:[
                {userName},
                {email}
            ]
        });
    
        if(!user)
        {
            res.status(401).json({message:"Invalid Credentials" })
        }
    
        const isPasswordValid = await bcrypt.compare(password,user.password)
    
        if(!isPasswordValid){res.status(401).json({message:"Invalid Password"})}
    
        const token = jwt.sign({
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET)
    
         res.cookie("token", token)
    
        res.status(200).json({
            message:"Login SuccessFully",
            user:{
                id:user._id,
                username:user.userName,
                email:user.email,
                role:user.role
            }
        })
    
    } catch (error) {
        res.status(500).json({
            error:error.message||"Internal Server Error",

        })
        
    }



}

async function logoutUser(req,res)
{

    res.clearCookie("token")
    res.status(200).json({
        message:"Logout SuccessFully !"
    })
}


export { register,loginUser,logoutUser }