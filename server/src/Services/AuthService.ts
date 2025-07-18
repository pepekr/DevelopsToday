import { createToken} from "./TokenManagerService.js"
import { verifyPassword, hashPassword } from "./PasswordManagerService.js"
import { UserLogin, UserSignIn  } from "../../../shared/interfaces/User.js"
import { UserService } from "./UserService.js"
import { PrismaUserRepository } from "DataLayer/PrismaUserRepository.js"

const prisma = new PrismaUserRepository()
export const userRepo = new UserService(prisma)

export async function manageLogin(body:UserLogin)
{
    if(!body.email || !body.password) return {error:"Email or password is null", status:401}
    const dbUser = await userRepo.findByEmail(body.email)
    if(!dbUser) return {error: "User with this email was not found", status:401 }
    const match = await verifyPassword(body.password, dbUser.password);
    if(!match) return {error: "Wrong credentials", status:401}
    const accessExpiration = 15 * 60 //seconds
    const refreshExpiration = 30 * 24 * 60 * 60
    console.log("Creating token")
    const refreshToken = createToken({id:dbUser.id.toString(), email:dbUser.email}, refreshExpiration)
    const accessToken = createToken({id:dbUser.id.toString(), email:dbUser.email},accessExpiration)
    if(!refreshToken || !accessToken) return {error:"Couldnt create token"}
    return {accessToken:accessToken, refreshToken:refreshToken}
}






export async function manageSignin(body:UserSignIn)
{
    if(!body.email || !body.password || !body.confirmedPassword) return {error:"Email or password or confirmed password is null", status:401}
    if(body.confirmedPassword!==body.password) return {error:"Passwords dont match", status:401}
    const isExist = await userRepo.findByEmail(body.email)
    if(isExist!==null) return {error:"User with this email already exist", status:400}
    const hashedPassword = await hashPassword(body.password)
    const user:UserSignIn = 
    {   
        password: hashedPassword,
        email:body.email,
    }
    await userRepo.create(user)
    const dbUser = await userRepo.findByEmail(user.email)
    if(!dbUser) return {error:"Something went wrong user not found", status:500}
    const accessExpiration = 15 * 60
    const refreshExpiration = 30 * 24 * 60 * 60
    const refreshToken = createToken({id:dbUser.id.toString(), email:dbUser.email}, refreshExpiration)
    const accessToken = createToken({id:dbUser.id.toString(), email:dbUser.email},accessExpiration)
    if(!refreshToken || !accessToken) return {error:"Couldnt create token"}
    return {accessToken:accessToken, refreshToken:refreshToken}
}