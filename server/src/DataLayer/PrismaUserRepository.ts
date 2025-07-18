import { IUserRepository } from "../../../shared/interfaces/IUserRepository.js";
import { UserSignIn, UserWithCreds } from "../../../shared/interfaces/User.js";
import prisma from "./prismaClient.js";

export class PrismaUserRepository implements IUserRepository
{
    async create(data: UserSignIn): Promise<UserWithCreds | null> {
        try {
            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                },
            });
            return user as UserWithCreds;
        } catch {
            return null;
        }
    }

    async delete(id: string): Promise<UserWithCreds | null> {
        try {
            const user = await prisma.user.delete({
                where: { id },
            });
            return user as UserWithCreds;
        } catch {
            return null;
        }
    }

    async findByEmail(email: string): Promise<UserWithCreds | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user as UserWithCreds | null;
    }

    async findById(id: string): Promise<UserWithCreds | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user as UserWithCreds | null;
    }
}