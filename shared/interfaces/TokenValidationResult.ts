import { cookieType } from "./CookieType";
import { User } from "./User";
export interface TokenValidationResult {
  error?: string;
  status: number;
  cookie: cookieType[];
  user?: User;
}