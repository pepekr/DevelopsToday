import { Request, Response, NextFunction } from "express";
import validateToken from "../Services/VerifyTokenService.js"

export default async function tokenCheck(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;    
    const tokenCheckResult = await validateToken(cookies);
    if (tokenCheckResult.error) {
        res.clearCookie("access-token");
        res.clearCookie("refresh-token");
        res.status(tokenCheckResult.status).send(JSON.stringify(tokenCheckResult.error));
        return;
    }

    const userData = tokenCheckResult.user; 

    if (userData) {
        res.locals.userId = userData.id;
        res.locals.userEmail = userData.email;
    }


    for (const cookieObj of tokenCheckResult.cookie) {
        res.cookie(cookieObj.name, cookieObj.value, cookieObj.options);
    }

    next();
}
