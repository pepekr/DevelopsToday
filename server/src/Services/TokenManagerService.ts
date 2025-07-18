import { User} from "../../../shared/interfaces/User.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const { sign, verify } = jwt;
dotenv.config();

export function createToken(data: User, expiration: number) {
  try {
    const jwt_token_key = process.env.JWT_TOKEN_KEY;
    if (!jwt_token_key) return null;
    const token = sign(data, jwt_token_key, {expiresIn:expiration}); // SECONDS!!!
    return token;
  } catch (error) {
    console.log(error);
    return null
  }
}

export function verifyToken(tokenToVerify: string) {
  try {
    const jwt_token_key = process.env.JWT_TOKEN_KEY;
    if (!jwt_token_key) return null;
    return verify(tokenToVerify, jwt_token_key);
  } catch (error) {
    console.log(error);
    return null
  }
}
