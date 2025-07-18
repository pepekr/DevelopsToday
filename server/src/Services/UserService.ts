import { IUserRepository } from "../../../shared/interfaces/IUserRepository.js";
import { UserSignIn } from "../../../shared/interfaces/User.js";

export class UserService 
{
    userRepo:IUserRepository;
    constructor(userRepo:IUserRepository)
    {
        this.userRepo = userRepo;
    }
    async create(data:UserSignIn)
    {
        return this.userRepo.create(data)
    }
    async findByEmail(email:string)
    {
        return this.userRepo.findByEmail(email)
    }
    async findById(id:string)
    {
        return this.userRepo.findById(id)
    }
    async delete(id:string)
    {
        return this.userRepo.delete(id)
    }
}