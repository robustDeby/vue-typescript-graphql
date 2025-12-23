import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

interface RegisterArgs {
    name:string
    avatar?:string
    birthday:string
    email:string
    password:string
}

interface LoginArgs {
    email: string
    password:string
}

export const authResolvers = {
    Mutation: {
        register:async(_:unknown, {input}:{input: RegisterArgs} ) => {
            const {
                name,
                avatar, 
                birthday,
                email, 
                password,
            } = input;

            //Existing user check
            const existingUser = await User.findOne({email})
            if(existingUser) {
                throw new Error('Email already in use')
            }

            //Hash password
            const hashedPassword =  await bcrypt.hash(password, 10)

            //Create user
            const user = await User.create({
                name,
                avatar,
                birthday: new Date(birthday),
                email,
                password:hashedPassword
            })
            //Generate token
            const token = jwt.sign(
                {userId:user._id},
                JWT_SECRET,
                {expiresIn:'7d'}
            )
            return {
                token, 
                user
            }
        },
        login:async(_:unknown,{input}:{input: LoginArgs}) => {
            const {
                email, password
            } = input;
            const user = await User.findOne({email})

            if(!user) {
                throw new Error('Invalid credentials')
            }
            const isValid = await bcrypt.compare(password,user.password)
            if(!isValid) {
                throw new Error('Invalid credentials')
            }
            const token = jwt.sign(
                {userId:user._id},
                JWT_SECRET,
                {expiresIn:'7d'}
            )
            return {
                token,
                user,
            }
        }
    }
}