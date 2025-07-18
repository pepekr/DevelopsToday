export interface User {
    id: string;
    email: string;
}
export interface UserWithCreds extends User
{
    password:string
}
export interface UserSignIn
{
    email:string,
    password:string,
    confirmedPassword?:string
}
export interface UserLogin
{
    email:string,
    password:string,
}