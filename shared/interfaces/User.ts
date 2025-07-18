export interface User {
    id: string;
    email: string;
}
export interface UserWithCreds extends User
{
    password:string
}