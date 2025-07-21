import { Request, Response } from "express";
import validateToken, { verifyTokenDataAndUser } from "../Services/VerifyTokenService.js"
import { manageLogin, manageSignin } from "Services/AuthService.js";
//TODO REWRITE STATUS CODES
export async function login(req:Request, res:Response)
{
   const loginRes = await manageLogin(req.body)
   if(loginRes.error)
    {
        return res.status(loginRes.status || 400).send(JSON.stringify(loginRes.error))
    }
    if(!loginRes.accessToken || !loginRes.refreshToken) 
        return res.status(loginRes.status || 500).send(JSON.stringify("Something went wrong durin authentiaction"))
    res.cookie("access-token", loginRes.accessToken, {
        httpOnly:true,
        expires: new Date(Date.now() + (15*60000)),
        secure: process.env.NODE_ENV === "production",

    })
    res.cookie("refresh-token", loginRes.refreshToken,{
        httpOnly:true,
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",   
    })
    return res.status(200).send(JSON.stringify(loginRes.accessToken)) // to set token in socket io   
}

export async function signin(req:Request, res:Response)
{
   const signinRes = await manageSignin(req.body)
   if(signinRes.error)
    {
        return res.status(signinRes.status || 400).send(JSON.stringify(signinRes.error))
    }
    if(!signinRes.accessToken || !signinRes.refreshToken) 
        return res.status(signinRes.status || 500).send(JSON.stringify("Something went wrong during authentiaction"))
    res.cookie("access-token", signinRes.accessToken, {
        httpOnly:true,
        expires: new Date(Date.now() + (15*60000)),
        secure: process.env.NODE_ENV === "production",
        
    })
    res.cookie("refresh-token", signinRes.refreshToken,{
        httpOnly:true,
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",   
      
    })
    return res.status(200).send(JSON.stringify(signinRes.accessToken)) // to set token in socket io   
}