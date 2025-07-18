import { createToken, verifyToken } from "./TokenManagerService.js";
import { JwtPayload } from "jsonwebtoken";
import { CookieOptions } from "express";
import { userRepo } from "./AuthService.js";
import { TokenValidationResult } from "../../../shared/interfaces/TokenValidationResult.js";
type cookieType = {
  name: string;
  value: any;
  options: CookieOptions;
};

export default async function validateToken(
  cookies: Record<string, any>
): Promise<TokenValidationResult> {
  const newCookies: cookieType[] = [];
  
  
  if (!cookies["refresh-token"])
    return { error: "Missing credentials", status: 400, cookie: newCookies };

  let userDataRefresh = verifyToken(cookies["refresh-token"]);
  const verifiedRefresh = await verifyTokenDataAndUser(userDataRefresh, "refresh");

  if (verifiedRefresh.error)
    return { error: verifiedRefresh.error, status: verifiedRefresh.status, cookie: newCookies };

  if (cookies["access-token"]) {
    let accessData = verifyToken(cookies["access-token"]);
    const verified = await verifyTokenDataAndUser(accessData, "access");

    if (verified.error)
      return { error: verified.error, status: verified.status, cookie: newCookies };
  }

  if (!cookies["access-token"]) {
  const user = verifiedRefresh.user;
  if (!user) {
    return {
      error: "User not found in refresh validation",
      status: 500,
      cookie: newCookies,
    };
  }
  const accessToken = createToken(
    { id: user.id.toString(), email: user.email },
    15 * 60
  );

  if (!accessToken) {
    return {
      error: "Error during token creation",
      status: 500,
      cookie: newCookies,
    };
  }

  const accessTokenObj: cookieType = {
    name: "access-token",
    value: accessToken,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 15 * 60000),
    },
  };
  newCookies.push(accessTokenObj);
}


  return {
    status: 200,
    cookie: newCookies,
    user: {
      id: verifiedRefresh.user.id.toString(),
      email: verifiedRefresh.user.email,
    },
  };
}


export async function verifyTokenDataAndUser(
  tokenData: string | JwtPayload | null | undefined,
  tokenType: "access" | "refresh",
  expirationCheck:boolean = true
):Promise<{
    error?: string;
    status: number;
    user?:any
} > {
  if (!tokenData) return { error: "Invalid refresh token", status: 400 }; // check token for valid verification
  tokenData = tokenData as JwtPayload;
  if (!tokenData.exp) return { error: "Expiration is not set", status: 400 };// check token expiration existing 
  if (expirationCheck && tokenData.exp*1000 < Date.now()) // check if expired
    return {
      error: "Refresh token is expired",
      status: 400,
    };
  const userFromDb = await userRepo.findByEmail(tokenData.email); // check in db 
  if (!userFromDb) return { error: `Invalid ${tokenType} token`, status: 400 };
  
  return {user:userFromDb,status:200}
}
