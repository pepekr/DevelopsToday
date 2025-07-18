import { UserSignIn, UserWithCreds } from "./User";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserWithCreds | null>;
  findById(id: string): Promise<UserWithCreds | null>;
  create(data: UserSignIn): Promise<UserWithCreds | null>;
  delete(id: string): Promise<UserWithCreds | null>;
}
